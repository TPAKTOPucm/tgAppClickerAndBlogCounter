import React from 'react';
import './clicker.css'

const tg = window.Telegram.WebApp;

var IsTimerRunning = false
var money = 0;
var moneyup = 1;
var msec = 0;
var upcost = 15;
var catcost = 25;
var workercost = 250;
var upown = 0;
var catown = 0;
var workerown = 0;
var catadd = 1;
var workadd = 15;
var cboost = 1;
var wboost = 1;
var catmax = 0;
var workmax = 0;
const clickEl = React.createRef()
const totalEl = React.createRef()
const catEl = React.createRef()
const workerEl = React.createRef()
const upgradeEl = React.createRef()
//save before exiting
/*
function closingCode() {
  if (confirm("You have closed the window, would you like to save?") === true) {
    save();
    return null;
  }
}
*/

const Clicker = () => {
    setTimeout( () => {
        if(IsTimerRunning)
            return null
        setInterval(myTimer, 1000)
        IsTimerRunning = true
    }, 500);
    return(
    <center className='center'>
        <h1 ref={totalEl}>LB: 0</h1>
        <h5 ref={clickEl}>LB/click: 1 | LB/sec: 0</h5>
        <img className="round" src="https://decostones.ie/wp-content/uploads/2015/11/click-hand.png" width="150" onClick={clicked}></img>
        <br /><br />
        <button ref={upgradeEl} className="round" onClick={() => upgrade("upgrade")}>0-main upgrade: 15</button>
        <br /><br/>
        <button ref={catEl} className="round" onClick={() => upgrade("clicker cat")}>0-clicker cat: 25 | +1/sec</button>
        <br/><br/>
        <button ref={workerEl} className="round" onClick={() => upgrade("worker")}>0-worker: 250 | +15/sec</button><br/><br/>
        <button className="settings" onClick={save}>Save</button>
        <button classNameName="settings" onClick={load}>Load</button>
        <button className="settings" onClick={reset}>Reset</button><br/><br/>
        <div class="footer">
            <div><a href="/" style={{ textDecoration: 'none' }}>Home</a></div>
            <div>Tasks</div>
            <div>Friends</div>
        </div>
    </center>
    )
}

function addcomma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  //updates all values
  function reloadall() {
    try{
    clickEl.current.innerHTML =
      "LB/click: " + addcomma(moneyup) + " | LB/sec: " + addcomma(msec);
    totalEl.current.innerHTML = "LB: " + addcomma(money);
    catEl.current.innerHTML =
      catown + "-clicker cat: " + addcomma(catcost) + " | +" + addcomma(catadd) + "/sec";
    workerEl.current.innerHTML =
      workerown + "-worker: " + addcomma(workercost) + " | +" + addcomma(workadd) + "/sec";
    upgradeEl.current.innerHTML =
      addcomma(upown) + "-main upgrade: " + addcomma(upcost);
    } catch(err) {
        console.log(err)
    }
  }
  //overwrites save file
  function save() {
    try{
        var data = {
            money: money,
            moneyup: moneyup,
            upcost: upcost,
            catcost: catcost,
            workercost: workercost,
            upown: upown,
            catown: catown,
            workerown: workerown,
            catadd: catadd,
            workadd: workadd,
            cboost: cboost,
            wboost: wboost,
            catmax: catmax,
            workmax : workmax,
            msec: msec
        }
        fetch(/*process.env.BASE_URI*/ 'http://localhost:5000' + '/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(response => alert('Сохранено')).catch(err => console.log(err))
    } catch(err){
    localStorage.setItem("money", money);
    localStorage.setItem("moneyup", moneyup);
    localStorage.setItem("msec", msec);
    localStorage.setItem("upcost", upcost);
    localStorage.setItem("catcost", catcost);
    localStorage.setItem("catadd", catadd);
    localStorage.setItem("workercost", workercost);
    localStorage.setItem("workadd", workadd);
    localStorage.setItem("catown", catown);
    localStorage.setItem("workerown", workerown);
    localStorage.setItem("upown", upown);
    localStorage.setItem("catadd", catadd);
    localStorage.setItem("workadd", workadd);
    localStorage.setItem("cboost", cboost);
    localStorage.setItem("wboost", wboost);
    localStorage.setItem("catmax", catmax);
    localStorage.setItem("workmax", workmax);
    console.log(err)
    }
  }
  function getUserData(){
    var id = tg?.initDataUnsafe?.user?.id ?? 1514427621
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${/*process.env.BASE_URI*/'http://localhost:5000'}/startgame?id=${id}`, false);
    
    
    xhr.send()
    if (xhr.status != 200) {
        console.log('error')
    }
    var user = JSON.parse(xhr.responseText);
    localStorage.setItem('user', xhr.responseText);
    console.log('user',user);
    return user;
}
  //loads save file
  function load() {
    try{
        var user = getUserData()
        money = user.TypingPoints
        if(user.TypingData){
            moneyup = user.TypingData.moneyup
            upcost = user.TypingData.upcost;
            catcost = user.TypingData.catcost;
            workercost = user.TypingData.workercost;
            upown = user.TypingData.upown;
            catown = user.TypingData.catown;
            workerown = user.TypingData.workerown;
            catadd = user.TypingData.catadd;
            workadd = user.TypingData.workadd;
            cboost = user.TypingData.cboost;
            wboost = user.TypingData.wboost;
            catmax = user.TypingData.catmax;
            workmax = user.TypingData.workmax;
            msec = user.TypingData.msec;
        }
    } catch(err){
        console.log(err)
    money = parseInt(localStorage.getItem("money"));
    moneyup = parseInt(localStorage.getItem("moneyup"));
    msec = parseInt(localStorage.getItem("msec"));
    upcost = parseInt(localStorage.getItem("upcost"));
    catcost = parseInt(localStorage.getItem("catcost"));
    upown = parseInt(localStorage.getItem("catadd"));
    workercost = parseInt(localStorage.getItem("workercost"));
    upown = parseInt(localStorage.getItem("workadd"));
    catown = parseInt(localStorage.getItem("catown"));
    workerown = parseInt(localStorage.getItem("workerown"));
    upown = parseInt(localStorage.getItem("upown"));
    catadd = parseInt(localStorage.getItem("catadd"));
    workadd = parseInt(localStorage.getItem("workadd"));
    cboost = parseInt(localStorage.getItem("cboost"));
    wboost = parseInt(localStorage.getItem("wboost"));
    catmax = parseInt(localStorage.getItem("catmax"));
    workmax = parseInt(localStorage.getItem("workmax"));
    }
    reloadall();
  }
  //resets all values
  
  function reset() {
    //if (confirm("Are you sure you want to reset?") === true) {
      money = 0;
      moneyup = 1;
      msec = 0;
      upcost = 15;
      catcost = 25;
      workercost = 250;
      catown = 0;
      workerown = 0;
      upown = 0;
      catadd = 1;
      workadd = 15;
      reloadall();
    //}
  }
    
  //timer
  function myTimer() {
      money += msec;
      try{
    totalEl.current.innerHTML = "LB: " + addcomma(money);
  } catch(err){
      console.log(err)
    }
  }
  
  //what happens when button is clicked
  function clicked() {
    money += moneyup;
    try{
    totalEl.current.innerHTML = "LB: " + addcomma(money);
    } catch(err){
      console.log(err)
    }
  }
  //upgrade function
  function upgrade(name) {
    try{
    if (name == "clicker cat") {
      if (money >= catcost && catown < 50) {
        
        if (catown <= 13) {
          msec += catadd;
          catadd++;
          cboost = 1;
        } else if (catown == 14) {
          msec += catadd;
          catadd++;
          cboost = 200;
        } else if (catown <= 23) {
          msec += 200 * catadd;
          catadd++;
          cboost = 200;
        } else if (catown == 24) {
          msec += 200 * catadd;
          catadd++;
          cboost = 5000;
        } else if (catown <= 48) {
          msec += 5000 * catadd;
          catadd++;
          cboost = 5000;
        } else if (catown == 49) {
          msec += 5000 * catadd;
          catadd++;
          cboost = 15000;
        } else {
          msec += 15000 * catadd;
          catadd++;
          cboost = 15000;
        }
        catown += 1;
        money -= catcost;
        catcost = catcost * 2;
        catEl.current.innerHTML =
          catown + "-clicker cat: " + addcomma(catcost) + " | +" + addcomma(catadd * cboost) + "/sec";
      } else if (catown == 50) {
        catEl.current.innerHTML =
          catown + "-clicker cat: MAX | +15% click/sec";
      }
    }
  
    if (name == "worker") {
      if (money >= workercost && workerown < 50) {
        
        if (workerown <= 13) {
          msec += workadd;
          workadd++;
          wboost = 1;
        } else if (workerown == 14) {
          msec += workadd;
          workadd++;
          wboost = 200;
        } else if (workerown <= 23) {
          msec += 200 * workadd;
          workadd++;
          wboost = 200;
        } else if (workerown == 24) {
          msec += 200 * workadd;
          workadd++;
          wboost = 5000;
        } else if (workerown <= 48) {
          msec += 5000 * workadd;
          workadd++;
          wboost = 5000;
        } else if (workerown == 49) {
          msec += 5000 * workadd;
          workadd++;
          wboost = 15000;
        } else {
          msec += 15000 * workadd;
          workadd++;
          wboost = 15000;
        }
        workerown += 1;
        money -= workercost;
        workercost = workercost * 3;
        workerEl.current.innerHTML = 
          workerown + "-worker: " + addcomma(workercost) + " | +" + addcomma(workadd * wboost) + "/sec";
      } else if (workerown == 50) {
        workerEl.current.innerHTML =
          workerown + "-worker: MAX | +35% click/sec";
      }
    }
  
    if (name == "upgrade") {
      if (money >= upcost) {
        moneyup += upcost / 15;
        money -= upcost;
        upown += 1;
        upcost = upcost * 5;
        upgradeEl.current.innerHTML =
          addcomma(upown) + "-main upgrade: " + addcomma(upcost);
        if (catown == 50) {
          msec -= catmax;
          catmax = Math.floor(moneyup * 0.15);
          msec += catmax;
        }
        if (workerown == 50) {
          msec -= workmax;
          workmax = Math.floor(moneyup * 0.35);
          msec += workmax;
        }
      }
    }
  
    clickEl.current.innerHTML =
      "LB/click: " + addcomma(moneyup) + " | LB/sec: " + addcomma(msec);
    totalEl.current.innerHTML = "LB: " + addcomma(money);
    console.log(msec)
}catch(err) {
    console.log(err)
}
  }
  

export default Clicker