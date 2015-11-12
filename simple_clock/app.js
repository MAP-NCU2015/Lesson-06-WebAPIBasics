function updateClock(clockDOM, d) {
  clockDOM.innerHTML = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' +
                       d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
}

function updateWatch(watchDOM, counter) {
  var ms = Math.floor(counter % 100);
  var ss = Math.floor((counter / 100) % 60);
  var mm = Math.floor(counter / 100 / 60);

  var msStr = ms < 10 ? '0' + ms : ms;
  var ssStr = ss < 10 ? '0' + ss : ss;
  var mmStr = mm < 10 ? '0' + mm : mm;

  watchDOM.innerHTML = mmStr + ':' + ssStr + ':' + msStr;
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
