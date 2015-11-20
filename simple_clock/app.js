var clock_show = document.getElementById("clock");
clock();
setInterval(clock, 10);

function clock() {
  var d = new Date(Date.now());
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var hour = "0" + d.getHours();
  var minute = "0" + d.getMinutes();
  var second = "0" + d.getSeconds();
  var timezone = d.getTimezoneOffset() / 60 * (-1);
  
  if (timezone >= 0) {
    timezone = '+' +timezone
  }
  else {
    timezone = '-' +timezone
  }
  clock_show.innerHTML = year + "/" + month + "/" + date + " <br>"  + hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) + "<br> UTC/GMT " + timezone;
}

t = 0;
state = 0;
var timer_main = document.getElementById("timer");

function start() {
  if (state != 1) {
    c = setInterval(count, 10);
    state = 1;
    c;
  }  
}

function count() {
  t++; 
  var timer_minute = ("0" + parseInt(t / 6000)).slice(-2);
  var timer_second = ("0" + parseInt(t / 100 % 60)).slice(-2); 
  var timer_ms = ("0" + parseInt(t % 100)).slice(-2);
  timer_main.innerHTML = timer_minute + ":" + timer_second + "." + timer_ms;
}

function stop() {
  if (state == 1) {
    state = 2;
    clearInterval(c);
  }
}

function reset() {
  if (state != 0) {
    t = 0;
    state = 0;
    clearInterval(c);
    timer_main.innerHTML = "00:00.00"; 
  }
}

function Alarm() {
   var startAlarm = document.getElementById('alarm_btn');
   startAlarm.addEventListener('click', function(event) {
      var date = new Date();
      var alarm_min = document.getElementById('alarm_min');
      var alarm_sec = document.getElementById('alarm_sec');
      var t_min = +alarm_min.value + date.getMinutes();
      var t_sec = +alarm_sec.value + date.getSeconds();
      date.setMinutes(t_min);
      date.setSeconds(t_sec);
      var alarm = navigator.mozAlarms.add(date, 'ignoreTimezone');
   });
}

navigator.mozSetMessageHandler("alarm", function(alarm) {
    new Notification("Time up");
 });