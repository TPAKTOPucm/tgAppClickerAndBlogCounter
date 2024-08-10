import React from "react"

const tg = window.Telegram.WebApp;

const levelInfo = [[0,1,1,45],[1000,2,45,85],[5000,3,85,125],[10000,4,125,165],[20000,5,165,200],[40000,6,200,240],[80000,7,240,280],[160000,8,280,320],[320000,9,320,400],[500000,10,400,500],[1000000,11,500,1000],[3000000,12,1000,1500],[10000000,13,1500,2000],[30000000,14,2000,3000],[100000000,15,3000,5000]]

function getUserData(){
    var id = tg?.initDataUnsafe?.user?.id ?? 1
    var user = localStorage.getItem("user")
    user = JSON.parse(user)
    if(user && id && user?.id === id)
        return user
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/startgame?id=${id}`, false);
    
    
    xhr.send()
    if (xhr.status != 200) {
        console.log('error')
    }
    user = JSON.parse(xhr.responseText);
    localStorage.setItem(xhr.responseText);
    console.log('user',user);
    return user;
}

const Start = () => {
    var name, user, photo
    try{
        name = tg.initDataUnsafe.user.username
        user = getUserData()
        photo = tg.initDataUnsafe.user.photo_url
    } catch (err){
        name = 'user_Ivan'
        photo = 'blob:https://web.telegram.org/79465612-ccf4-486d-85fc-fdd115b0ac20'
        user = {
            level: 1,
            Streak: 1,
            Points: 12,
            BestStreak: 1,
            Rank:1,
            WeeklyStreak:1028,
            TypingPoints: 0
        }
        console.log(err)
    }
    return (
    <div class="container">
        <div class="profile">
            <img src={`${photo ?? 'userpic.png'}`} alt="User Picture" />
            <div class="profile-info">
                <div>{name}</div>
                <div>Level {user.level}</div>
                <div>Progress</div>
                <div class="progress-bar"></div>
            </div>
            <div class="streak">{user.Streak}</div>
        </div>
        <div class="points">
            <div>{user.Points}</div>
            <div class="stats">
                <img src="hamster.png" alt="Hamster Image" class="hamster" />
                <div class="stats-text">
                    <div>Best Streak: {user.BestStreak}</div>
                    <div>Current Streak: {user.Streak}</div>
                    <div>Global Rating: {user.Rank}</div>
                </div>
            </div>
        </div>
        <div class="days">
            <div class={`day ${(user.WeeklyStreak & (1 << 1)) ? 'checked' : ''}`}>Mon</div>
            <div class={`day ${(user.WeeklyStreak & (1 << 2)) ? 'checked' : ''}`}>Tue</div>
            <div class={`day ${(user.WeeklyStreak & (1 << 3)) ? 'checked' : ''}`}>Wed</div>
            <div class={`day ${(user.WeeklyStreak & (1 << 4)) ? 'checked' : ''}`}>Thu</div>
            <div class={`day ${(user.WeeklyStreak & (1 << 5)) ? 'checked' : ''}`}>Fri</div>
            <div class={`day ${(user.WeeklyStreak & (1 << 6)) ? 'checked' : ''}`}>Sat</div>
            <div class={`day ${(user.WeeklyStreak & 1) ? 'checked' : ''}`}>Sun</div>
        </div>
        <div class="game">
            <div class="game-container">
                <div>Typing Game <span>{user.TypingPoints}</span></div>
                <button>Play</button>
            </div>
        </div>
        <div class="game">
            <button>Start Farming</button>
        </div>
        <div class="footer">
            <div>Home</div>
            <div>Tasks</div>
            <div>Friends</div>
        </div>
    </div>
    );
}

export default Start