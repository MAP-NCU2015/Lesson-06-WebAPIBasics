var currentTime = function (){
  var time = new Date();
  
  var year = time.getFullYear();
  var month = checkTime(time.getMonth() + 1);
  var date = checkTime(time.getDate());
  var hour = checkTime(time.getHours());
  var minute = checkTime(time.getMinutes());
  var second = checkTime(time.getSeconds());

  var t = year + "/" + month + "/" + date + " " +
  hour + ":" + minute + ":" + second;

  var day = time.getDay();
  switch(day){
    case 0:
      day = "Monday";
      break;
    case 1:
      day = "Tuesday";
      break;
    case 2:
      day = "Wednesday";
      break;
    case 3:
      day = "Thursday";
      break;
    case 4:
      day = "Friday";
      break;
    case 5:
      day = "Saturday";
      break;
    case 6:
      day = "Sunday";
      break;
  }

  var timezone = time.toTimeString();
  document.getElementById("time").innerHTML = t;
  document.getElementById("week").innerHTML = day;
  document.getElementById("timezone").innerHTML = timezone;
}

var checkTime = function (time){
  return ((time < 10 ? "0" : "") + time);
}

// stop watch class
var StopWatch = function() {
    var startAt = 0;  // Time of last start / resume. (0 if not running)
    var pauseTime = 0;  // Time on the clock when last stopped in milliseconds

    var now = function() {
        return (new Date()).getTime(); 
      }; 
 
    // Public methods
    // Start or resume
    this.start = function() {
        // check if started, if not -> change startAt to now
        if(!startAt)
          startAt = now();
      };

    // Stop or pause
    this.pause = function() {
        // If running, update elapsed time otherwise keep it
        if(startAt)
          pauseTime += now() - startAt;
        startAt = 0; // Paused
      };

    // Reset
    this.reset = function() {
        pauseTime = startAt = 0;
      };

    // Duration
    this.time = function() {
        if(startAt)
          return pauseTime + now() - startAt;
        else
          return pauseTime;
      };
  };

var sw = new StopWatch();
var curTime;
var clocktimer;

function formatTime(time) {
  var h = m = s = ms = 0;
  var newTime = '';

  h = Math.floor( time / (60 * 60 * 1000) );
  time = time % (60 * 60 * 1000);
  m = Math.floor( time / (60 * 1000) );
  time = time % (60 * 1000);
  s = Math.floor( time / 1000 );
  ms = time % 1000;

  // set all format to 2 digits
  newTime = checkTime(h) + ':' + checkTime(m) + ':' + checkTime(s) + ':' + checkTime(ms);
  return newTime;
}

function show() {
  curTime = document.getElementById('countTime');
  update();
}

function update() {
  curTime.innerHTML = formatTime(sw.time());
}

function start() {
  // set interval to call it by itself
  clocktimer = setInterval("update()", 1);
  sw.start();
}

function pause() {
  sw.pause();
  clearInterval(clocktimer);
}

function reset() {
  pause();
  x.reset();
  update();
}

