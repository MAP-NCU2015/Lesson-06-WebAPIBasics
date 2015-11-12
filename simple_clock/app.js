function setclock() {
  var now = new Date(Date.now());
  var year = now.getFullYear();
  var month = 1 + now.getMonth();
  var date = now.getDate();
  var week = 1 + now.getDay();
  var timezone = now.getTimezoneOffset();

  var hour = "0" + now.getHours();
  var minute = "0" + now.getMinutes();
  var second = "0" + now.getSeconds();

  switch (now.getDay()) {
    case 0:
      day = "星期日";
      break;
    case 1:
      day = "星期一";
      break;
    case 2:
      day = "星期二";
      break;
    case 3:
      day = "星期三";
      break;
    case 4:
      day = "星期四";
      break;
    case 5:
      day = "星期五";
      break;
    case 6:
      day = "星期六";
      break;
    }
  clockcontent.innerHTML = year + "/" + month + "/" + date + " " + day + " " + hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) + "<br> 時區：UTC/GMT " + (timezone>0?"-":"+") + timezone / -60;
}

function count() {
  t++; 
  timercontent.innerHTML = ("0" + parseInt(t / 6000)).slice(-2) + ":" + ("0" + parseInt(t / 100 % 60)).slice(-2) + "." + ("0" + parseInt(t % 100)).slice(-2);
}

function reset() {
  t = 0;
  clearInterval(c);
  timercontent.innerHTML = "00:00.00";
}

//main clock
var clockcontent = document.getElementById("clock");
setclock();
setInterval(setclock, 10);

//timer
t = 0;
var timercontent = document.getElementById("timer");

//alarm
var alarmbutton = document.getElementById("addalarm");
alarmbutton.addEventListener('click' , function(event) {
  var alarm_min = document.getElementById("alarm_min");
  var alarm_sec = document.getElementById("alarm_sec");
  var alarmtime = new Date();
  alarmtime.setMinutes(alarmtime.getMinutes() + alarm_min.value);
  alarmtime.setSeconds(alarmtime.getSeconds() + alarm_sec.value);
  var data = {
    foo: "bar"
  }
  var request = navigator.mozAlarms.add(alarmtime, "ignoreTimezone", data);
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

