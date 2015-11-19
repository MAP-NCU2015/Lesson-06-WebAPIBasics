window.addEventListener("load", function() {
  console.log("Hello World!");
  window.setInterval(update, 1000);
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
