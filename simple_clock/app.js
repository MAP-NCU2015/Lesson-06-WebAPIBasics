var current_time = "1";
var set_time = "0";
var timerSec = 0;
var timerMin = 0;
var timerHour = 0;
document.getElementById("timer").innerHTML ='00:00:00'
function addZero(s){
if(s<10)
{
    return "0"+s;
}else{
    return s;
}
}
function getTime()
{
    var d=new Date();
    document.getElementById("time").innerHTML=
        addZero(d.getHours())+":"+
        addZero(d.getMinutes())+":"+
        addZero(d.getSeconds());
    current_time = document.getElementById("time").innerHTML; 
}
setInterval(getTime,1000);
function setAlarm()
{
    set_time = prompt("Plz enter alarm time:","xx:xx:xx");
        if (set_time != null) {
        document.getElementById("show_setAlarm").innerHTML =
        "您的鬧鐘時間： " + set_time ;
    }
}
function checkthealarm(){
    if(current_time == set_time){
        window.navigator.vibrate([10,20,40,80,160,360,720]);
        spawnNotification('Time\'s up');
        document.getElementById("show_setAlarm").innerHTML = "";
    }
}
setInterval(checkthealarm,1000);

//碼表
document.getElementById('stopwatch_start').onclick = function(){
    var start = function(){
        timerSec += 1 ;
        if(timerSec === 60){
            timerSec = 0 ;
            timerMin += 1 ;
        }
		if(timerMin === 60){
			timerMin = 0 ;
			timerHour += 1;
		}
		var tSec = timerSec > 9 ? timerSec : '0' + timerSec;
		var tMin = timerMin > 9 ? timerMin : '0' + timerMin;
		var tHour = timerHour > 9 ? timerHour : '0' + timerHour;

		var timerNow = tHour + ':' + tMin + ':' + tSec ;
		document.getElementById("timer").innerHTML =  timerNow ;
		}
		var p_timer = setInterval( start ,1000) ;

		document.getElementById('stopwatch_pause').onclick = function(){
  			window.clearInterval(p_timer);
  		}

  		document.getElementById('stopwatch_stop').onclick = function(){
  		window.clearInterval(p_timer);
  		timerHour = 0 ;
  		timerMin = 0 ;
  		timerSec = 0 ;

  		var tSec = timerSec > 9 ? timerSec : '0' + timerSec;
		var tMin = timerMin > 9 ? timerMin : '0' + timerMin;
		var tHour = timerHour > 9 ? timerHour : '0' + timerHour;

  		var timerNow = tHour + ':' + tMin + ':' + tSec ;
		showTimer.textContent = timerNow ;
  		}

}

function notifyMe() {
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }else if (Notification.permission === "granted") {
    var notification = new Notification("Hi there!");
  }else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}
function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
  setTimeout(n.close.bind(n), 5000); 
}