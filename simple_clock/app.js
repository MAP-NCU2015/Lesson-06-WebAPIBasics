function f(num) {
  return num < 10 ? '0' + num : num;
}

function weeksInYear() {
  var date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

function updateClock(clockDOM, d) {
  var tz = -(d.getTimezoneOffset() / 60);
  var tzStr = tz < 0 ? 'GMT' + tz : 'GMT+' + tz;
  clockDOM.innerHTML = d.getFullYear() + '/' + f(d.getMonth() + 1) + '/' + f(d.getDate()) + ' ' +
                       f(d.getHours()) + ':' + f(d.getMinutes()) + ':' + f(d.getSeconds()) + ' ' +
                       tzStr + ' (' + weeksInYear() + ' weeks)';
}

function updateWatch(watchDOM, counter) {
  var ms = Math.floor(counter % 100);
  var ss = Math.floor((counter / 100) % 60);
  var mm = Math.floor(counter / 100 / 60);

  watchDOM.innerHTML = f(mm) + ':' + f(ss) + ':' + f(ms);
}

var clockDOM = document.querySelector('#clock');

updateClock(clockDOM, new Date());
setInterval(function() {
  updateClock(clockDOM, new Date());
}, 1000);

var counter = 0;
var watchIntervalId = null;

var watchDOM = document.querySelector('#stopwatch');
var startBtn = document.querySelector('#start');
var pauseBtn = document.querySelector('#pause');
var resetBtn = document.querySelector('#reset');

updateWatch(watchDOM, counter);
startBtn.addEventListener('click', function (event) {
  if (watchIntervalId) return;
  watchIntervalId = setInterval(function() {
    updateWatch(watchDOM, ++counter);
  }, 10);
});

pauseBtn.addEventListener('click', function (event) {
  clearInterval(watchIntervalId);
  watchIntervalId = null;
});

resetBtn.addEventListener('click', function (event) {
  clearInterval(watchIntervalId);
  watchIntervalId = null;
  counter = 0;
  updateWatch(watchDOM, counter);
});

var alarmBtn = document.querySelector('#alarm');

alarmBtn.addEventListener('click', function (event) {
  var afterInput = document.querySelector('#after');
  var now = new Date();
  now.setSeconds(now.getSeconds() + +afterInput.value);
  var alarm = navigator.mozAlarms.add(now, 'ignoreTimezone');
});

navigator.mozSetMessageHandler("alarm", function (alarm) {
  new Notification("Your task arrived");
});
