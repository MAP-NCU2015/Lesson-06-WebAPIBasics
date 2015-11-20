window.addEventListener("load", function() {
  console.log("YenC's CLOCK");
  window.setInterval(update, 1000);
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
    
function fixZero(num){
  var result = num;
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