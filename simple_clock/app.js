window.addEventListener("load", function() {
  var intervalID = window.setInterval(updateTime, 1000);
  initStopWatch();
});

function updateTime() {
  var content = document.querySelector('content');
  content.innerHTML = getNowTimeString();
}

function getNowTimeString() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var week = now.getWeekNumber();
  var timezone = now.getTimezoneOffset();
  var timezoneString = 'UTC';
  if (timezone > 0) {
    timezoneString += '-';
  } else {
    timezoneString += '+';
  }

  timezoneString = timezoneString + Math.abs(timezone) / 60 + 'hour ';
  if (Math.abs(timezone) % 60 != 0) {
    timezoneString = timezoneString + Math.abs(timezone) % 60 + 'min';
  }

  return year + '/' + pad(month, 2) + '/' + pad(date, 2) + ' ' + pad(hour, 2) + ':' + pad(minute, 2) + ':' + pad(second, 2) + '<br> Week: ' + week + ', Timezone: ' + timezoneString;
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

Date.prototype.getWeekNumber = function(){
  var d = new Date(+this);
  d.setHours(0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};


function initStopWatch() {
  var timeContent = document.querySelector('stopwatch time');
  timeContent.innerHTML = '00:00.00';

  // Setup event handler
  var startBtn = document.getElementById('start-btn');
  var resetBtn = document.getElementById('reset-btn');
  var pauseBtn = document.getElementById('pause-btn');

  var timeFlag = 0;
  var intervalID = -1;

  startBtn.onclick = function() {
    console.log('startBtn click');
    if (intervalID == -1){
      intervalID = window.setInterval(function () {
        timeFlag += 1;

        var minute = Math.floor(timeFlag / 100 / 60);
        var second = Math.floor(timeFlag / 100 % 60);
        var ms = timeFlag % 100;
        timeContent.innerHTML = pad(minute, 2) + ':' + pad(second, 2) + '.' + pad(ms, 2);
      }, 10);
    }
  }

  resetBtn.onclick = function() {
    console.log('resetBtn click');
    window.clearInterval(intervalID);
    intervalID = -1;
    timeFlag = 0;
    timeContent.innerHTML = '00:00.00';
  }

  pauseBtn.onclick = function() {
    console.log('pauseBtn click');
    window.clearInterval(intervalID);
    intervalID = -1;
  }
}
