window.addEventListener("load", function() {
  console.log("YenC's CLOCK");
  window.setInterval(update, 1000);
  stopWatch();
});

function getTime(){
  var d,s = "";
  d = new Date();
  s += d.getFullYear() + "/";
  s += fixZero(d.getMonth()+1) + "/";
  s += fixZero(d.getDate()) + " ";
  s += fixZero(d.getHours()) + ":";
  s += fixZero(d.getMinutes()) + ":";
  s += fixZero(d.getSeconds());
  return (s);
}

function getWeek(){
  var d, day, x, s = "Today is ";
  var x = new Array("Sunday", "Monday", "Tuesday");
  var x = x.concat("Wednesday","Thursday", "Friday");
  var x = x.concat("Saturday");
  d = new Date();
  day = d.getDay();
  return(s += x[day]);  
}

function getTimezone(){
  var d, tz, s = "The current local time is ";
  d = new Date();
  tz = d.getTimezoneOffset();
  if (tz < 0)
  s += -1*tz / 60 + " hours before GMT";
  else if (tz == 0)
  s += "GMT";
  else
  s += tz / 60 + " hours after GMT";
return(s); 
}
    
function stopWatch(){
  var stopwatch = document.getElementById('stopwatch');
  var start = document.getElementById('start');
  var pause = document.getElementById('pause');
  var reset = document.getElementById('reset');
  var running = 0;
  var timer = 0;
  var count = 0;
  stopwatch.innerHTML = "00:00:00";
  
  start.addEventListener('click', function(event) {
    if (running == 0){
      running = 1;
      timer = setInterval(function(){
        count += 1;
        var min = fixZero(Math.floor(count/6000));
        var sec = fixZero(Math.floor(count/100 % 60));
        var ms = fixZero(count%100);
        stopwatch.innerHTML = min + ":" + sec + ":" + ms;
      }, 10);
    } else{
      alert('Please cease the STOPWATCH first');
    }
  });
  
  pause.addEventListener('click',function(event){
    if (running ==1 ){
      running =0;
      window.clearInterval(timer);
    }else {
      alert('The STOPWATCH is not running at all');
    }
  });
  
  reset.addEventListener('click',function(event){
    running = 0;
    count = 0;
    window.clearInterval(timer);
    stopwatch.innerHTML = "00:00:00";
  });
  
}

function fixZero(num){
  var result = ''+num;
  if ( result.length < 2 )
    result = '0' + result;
  return result;
}
  
function update(){
  var current = document.querySelector('#current');
  current.innerHTML = getTime();
  var week = document.querySelector('#week');
  week.innerHTML = getWeek();
  var timezone = document.querySelector('#timezone');
  timezone.innerHTML = getTimezone();
}