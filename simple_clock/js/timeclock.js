
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