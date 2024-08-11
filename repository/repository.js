const User = require('../models/User.js')
const levelInfo = [[0,1,1,45],[1000,2,45,85],[5000,3,85,125],[10000,4,125,165],[20000,5,165,200],[40000,6,200,240],[80000,7,240,280],[160000,8,280,320],[320000,9,320,400],[500000,10,400,500],[1000000,11,500,1000],[3000000,12,1000,1500],[10000000,13,1500,2000],[30000000,14,2000,3000],[100000000,15,3000,5000]]

class Repository{
    async getUser(id){
        var user = await User.find({_id: id})
        return user
    }

    async updateClicker(userData){
        var user = await this.getUser(userData._id)
        user.TypingPoints = userData.money
        userData._id = undefined
        userData.money = undefined
        user.TypingData = userData
        await user.save()
    }

    __getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min) + 1;
      }

    async addUser(userData){
        var user = new User(userData)
        await user.save()
    }

    _addPoints(level, streak){
        return (1 + streak * 0.05) * this.__getRandomInt(levelInfo[level-1][2], levelInfo[level-1][3])
    }

    async sendPost(user, channelId, postNumber) {
        var message = ''
        console.log(channelId, postNumber, user.ChannelId, user.LastPostNumber)
        try{
            if(user.Posts_per_current_day === 0){
                user.WeeklyStreak += 1024 + (1 << new Date().getDay()) // 1 - ВС, 2 - ПН, 4 - ВТ и т.д.
            }
            if(user.Posts_per_current_day == 3){
                return "Максимальное количество постов опубликовано. Опубликуйте данный пост завтра"
            }
            if(user.ChannelId === null)
                user.ChannelId = channelId
            if(user.ChannelId == channelId && user.LastPostNumber < postNumber){
                user.LastPostNumber = postNumber
                user.Points += this._addPoints(user.CurrentLevel, user.Streak)
                user.Posts.push(`t.me/${channelId}/${postNumber}`)
                user.Posts_per_current_day++
            } else {
                return 'некорректная ссылка'
            }
            if(levelInfo[user.CurrentLevel] && levelInfo[user.CurrentLevel][0] <= user.Points){
                user.CurrentLevel++
                message += 'Уровень повышен\n'
            }
            await user.save()
            message += `Ваш уровень: ${user.CurrentLevel}\nВаш счёт: ${user.Points}`
        }catch(err){
            message = 'Возникла ошибка. Повторите запрос позже'
        }
        return message
    }
    async changeChannel(user, channelId){
        if(user.ChannelId != channelId){
            user.ChannelId = channelId
            user.LastPostNumber = 0
        }
        await user.save()
        return "Канал успешно изменён"
    }

    async getRank(user){
        return (await User.countDocuments({Points:{ $gt: user.Points}})) + 1
    }

    async getLeaderBoard(user){
        var leaders = await User.find().sort({Points: -1}).limit(10)
        leaders.map((l, index) => l.Rank = index + 1)
        if(!leaders.some((l) => l._id === user._id)){
            var rank = this.getRank(user)
            user.Rank = rank
            leaders.push(user)
        }
        return leaders
    }

    async updateStreak(){
        await User.updateMany({},
            [
                {
                    $set: {
                        Streak: {
                            $cond: {
                                if: { $gt: ["$WeeklyStreak", 3072] },
                                then: { $add: ["$Streak", 1] },
                                else: 0
                            }
                        },
                        WeeklyStreak: 0,
                        BestStreak: {
                            $cond: {
                                if: { $gt: ["$Streak", "$BestStreak"] },
                                then: "$Streak",
                                else: "$BestStreak"
                            }
                        }
                    }
                }
            ]
        )
    }

    async updateDailyLimit(){
        await User.updateMany({},[
            {
                $set:{
                    Posts_per_current_day: 0
                }
            }
        ])
    }
}

module.exports = Repository