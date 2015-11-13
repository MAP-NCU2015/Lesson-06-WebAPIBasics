//main clock
var clock_show = document.getElementById("clock");
clock_main();
setInterval(clock_main, 10);

function clock_main() {
  var now = new Date(Date.now());
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var timezone = now.getTimezoneOffset() / -60;

  var hour = "0" + now.getHours();
  var minute = "0" + now.getMinutes();
  var second = "0" + now.getSeconds();

  switch (now.getDay()) {
    case 0:
      weekday = "Sun.";
      break;
    case 1:
      weekday = "Mon.";
      break;
    case 2:
      weekday = "Tue.";
      break;
    case 3:
      weekday = "Wed.";
      break;
    case 4:
      weekday = "Thur.";
      break;
    case 5:
      weekday = "Fri.";
      break;
    case 6:
      weekday = "Sat.";
      break;
    }
  
  if (timezone >= 0) {
    timezone = '+' +timezone
  }
  else {
    timezone = '-' +timezone
  }
  clock_show.innerHTML = year + "/" + month + "/" + date + " " + weekday + "<br>" + hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) + "<br> UTC/GMT " + timezone;
}

//timer
t = 0;
state = 0;
var timer_main = document.getElementById("timer");

function start() {
  if (state == 1) {
  }
  else {
    c = setInterval(count, 10);
    state = 1;
    c;
  }  
}

function count() {
  t++; 
  var timer_hour = ("0" + parseInt(t / 6000)).slice(-2);
  var timer_minute = ("0" + parseInt(t / 100 % 60)).slice(-2); 
  var timer_second = ("0" + parseInt(t % 100)).slice(-2);
  timer_main.innerHTML = timer_hour + ":" + timer_minute + "." + timer_second;
}

function stop() {
  state = 0;
  clearInterval(c);
}

function reset() {
  t = 0;
  state = 0;
  clearInterval(c);
  timer_main.innerHTML = "00:00.00";  
}

//alarm
var alarm_main = document.getElementById("addalarm");
alarm_main.addEventListener('click' , function(event) {
  var alarm_min = document.getElementById("alarm_min");
  var alarm_sec = document.getElementById("alarm_sec");
  var set_time = new Date();
  set_time.setMinutes(set_time.getMinutes() + alarm_min.value);
  set_time.setSeconds(set_time.getSeconds() + alarm_sec.value);
  var data = {
    foo: "bar"
  }
  var request = navigator.mozAlarms.add(set_time, "ignoreTimezone", data);
  request.onsuccess = function () {
    console.log("The alarm has been scheduled");
  };
  request.onerror = function () { 
    console.log("An error occurred: " + this.error.name);
  };
  navigator.mozSetMessageHandler("alarm", function (request) { 
    new Notification("Alarm!!");
  });
});