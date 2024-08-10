const express = require('express')
const TelegramBot = require('node-telegram-bot-api')
const Repository = require('./repository/repository.js')

console.log(process.env.PORT)
const bot = new TelegramBot(process.env.TOKEN, {polling: true});
const repository = new Repository()
const ONE_DAY_MILLIS = 86_400_000
var date = new Date()

setTimeout(() => setInterval(repository.updateStreak, 7 * ONE_DAY_MILLIS),
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + (1 + 7 - date.getDay()) % 7, 0, 0, 0)
)
setTimeout(() => setInterval(repository.updateDailyLimit, ONE_DAY_MILLIS),
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 0, 0, 0)
)
bot.on('message', async (msg) => {
  var user = (await repository.getUser(msg.from.id))[0]

  
  if(!user){
    user = {
        _id: msg.from.id,
        TELEGRAM_USER_NAME: msg.from.username ?? (msg.from.first_name + ' ' + msg.from.last_name),
        Role: 2,
        Points: 0,
        Streak: 0,
        Posts_per_current_day: 0,
        BestStreak: 0,
        NumberOfPostsPerCurrentWeek: 0,
        CurrentLevel: 1,
        CurrentBooster: 0,
        LastPostNumber: 0,
        ChannelId: null,
        ReferralNumber: msg.from.id,
        ReferralLink: 'http://pizdec.com',
        NumberOfReferredPeopleTotal: 0,
        WeeklyStreak: 0
      }
    await repository.addUser(user)
  }

  if(msg.text.startsWith('/addpost t.me/')){
    try{
      var textArray = msg.text.split('/')
      var message = await repository.sendPost(user, Number(textArray[2]), Number(textArray[3]))
    } catch(err){
      message = 'некорректная ссылка'
    }
    bot.sendMessage(msg.chat.id, message)
  } else if(msg.text.startsWith('/changechannel')){
    try{
      var message = repository.changeChannel(user, Number(msg.text.split('/')[2]))
    } catch(err){
      message = 'Ошибка смены канала'
    }
    bot.sendMessage(msg.chat.id, message)
  } else if(msg.text === '/leaderboard'){
    try{
      var leaders = await repository.getLeaderBoard(user)
      var message = 'Место\tИмя пользователя\tОчки\n'
      console.log(leaders)
      for(var leader of leaders)
        message += `${leader.Rank}\t${leader.TELEGRAM_USER_NAME}\t${leader.Points}\n`
    } catch(err){
      console.log(err)
      bot.sendMessage(msg.chat.id, message)
    }
  } else if(msg.text.startsWith("/reminder")){
    bot.sendMessage(msg.chat.id, "work in progress")
  }
});


const app = express()

app.listen(process.env.PORT)

app.get('/startgame',(req, res)=>{
    
})

app.post('/endgame',(req, res)=>{})

app.get('/startclicker',(req, res)=>{})

app.post('/endclicker',(req, res)=>{})

app.get('/home',(req, res)=>{})

app.get('/tasks',(req, res)=>{})

app.get('/friends',(req, res)=>{})

app.post('/changeChannel',(req, res)=>{})