window.addEventListener("load", function() {
  console.log("Hello World!");
  setInterval(update, 1000);
  StopWatch();
});

function getTime() {
  var date = new Date();
  var year = date.getFullYear();
  var month = fillZero(date.getMonth());
  var day = fillZero(date.getDate());
  var hour = fillZero(date.getHours());
  var minute = fillZero(date.getMinutes());
  var second = fillZero(date.getSeconds());
  return year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
}

function getWeek() {
   var date = new Date();
   var weeknumber = date.getDay();
   var list = ['日', '一', '二', '三', '四', '五', '六'];
   return list[weeknumber];
}

function getTimeZone() {
   var date = new Date();
   var off = date.getTimezoneOffset();
   if(off < 0) {
     off = -1 * off;
     return "+" + fillZero(off / 60) + fillZero(off % 60);
   } else {
     return "-" + fillZero(off / 60) + fillZero(off % 60);
   }
}

function fillZero(num) {
  var result = ''+num;
  if( result.length < 2 )
    result = '0' + result;
  return result;
}

function update() {
    var current = document.querySelector('#current');
    current.innerHTML = getTime();
    var week = document.querySelector('#week');
    week.innerHTML = "今天星期" +  getWeek();
    var timezone = document.querySelector('#timezone');
    timezone.innerHTML = "時區: UTC" + getTimeZone();
}

function StopWatch() {
   var flag = 0;
   var stopwatch = document.getElementById('stopwatch');
   var start = document.getElementById('start');
   var pause = document.getElementById('pause');
   var reset = document.getElementById('reset');
   var timer = 0;
    var count = 0;
   
   stopwatch.innerHTML = "00:00:00";
   
   start.addEventListener('click', function (event) {
      if(flag == 0) {
         flag = 1;
         timer = setInterval(function() {
            count += 1;
            var min = fillZero(Math.floor(count / 6000));
            var sec =  fillZero(Math.floor(count / 100 % 60));
            var ms =  fillZero(count % 100);
            stopwatch.innerHTML = min + ":" + sec + ":" + ms;
         }, 10);
      } else {
         alert('G_G ler');
      }
   });
   
    pause.addEventListener('click', function(event) {
         if(flag == 1) {
            flag = 0;
            window.clearInterval(timer);
         } else {
            alert('G_G ler');
         }
   });
   
   reset.addEventListener('click', function(event) {
         flag = 0;
         count = 0;
         window.clearInterval(timer);
         stopwatch.innerHTML = "00:00:00";
   });
}
