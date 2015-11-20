// ----------- clock
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
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    case 7:
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

// --------- stopwatch
var StopWatch = function(){
  var startAt = 0;  // Time of last start / resume. (0 if not running)
  var pauseTime = 0;  // Time on the clock when last stopped in milliseconds

  var now = function(){
      return (new Date()).getTime(); 
  }; 
 
  // Public methods
  // Start or resume
  this.start = function(){
    // check if started, if not -> change startAt to now
    if(!startAt)
      startAt = now();
  };

  // Stop or pause
  this.pause = function(){
      // If running, update elapsed time otherwise keep it
    if(startAt)
      pauseTime += now() - startAt;
      startAt = 0; // Paused
  };

    // Reset
  this.reset = function(){
    pauseTime = startAt = 0;
  };

    // Duration
  this.time = function(){
    if(startAt)
      return pauseTime + now() - startAt;
    else
      return pauseTime;
  };
}

var sw = new StopWatch();
var timeLabel;
var timer;

function formatTime(time){
  var h = m = s = cc = 0;
  var newTime = '';

  h = Math.floor( time / (60 * 60 * 1000) );
  time = time % (60 * 60 * 1000);
  m = Math.floor( time / (60 * 1000) );
  time = time % (60 * 1000);
  s = Math.floor( time / 1000 );
  time = Math.floor(time/10);
  cc = time % 100;

  // set all format to 2 digits
  newTime = checkTime(m) + ':' + checkTime(s) + ':' + checkTime(cc);
  return newTime;
}

function show(){
  timeLabel = document.getElementById('countTime');
  update();
}

function update(){
  timeLabel.innerHTML = formatTime(sw.time());
}

document.getElementById("start").addEventListener('click', function(event){
  // set interval to call it by itself
  timer = setInterval("update()", 1);
  sw.start();
});

document.getElementById("pause").addEventListener('click', function(event){
  sw.pause();
  clearInterval(timer);
});

document.getElementById("reset").addEventListener('click', function(event){
  sw.pause();
  sw.reset();
  update();
});

// ----------- alarm
document.getElementById("alarm").addEventListener('click', function(event){
  var time = new Date();

  var minute = document.getElementById("minute").value;
  var second = document.getElementById("second").value;
  
  time.setTime(time.getTime() + (minute*60 + second)*1000);
  var alarm = navigator.mozAlarms.add(time, "ignoreTimezone");
  
  alarm.onsuccess = function(){
    console.log("Success");
  };
  
  alarm.onerror = function(){
    console.log("Error");
  };  
});

navigator.mozSetMessageHandler("alarm", function(mozAlarm){
  //alert("alarm fired: " + JSON.stringify(mozAlarm.date)); 
  new Notification("Time's up");
});

window.onload = function() {
  // create clock
  setInterval('currentTime()', 1000);
  // create stopwatch
  show();
}