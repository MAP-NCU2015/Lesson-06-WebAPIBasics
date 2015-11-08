window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  //var translate = navigator.mozL10n.get;
  navigator.mozL10n.once(start);
});

function start(){
  tictac();
  interval = setInterval(tictac, 1000);
}

function tictac() {
  document.getElementById('Clock').style.display = "block";
  document.getElementById('Count').style.display = "none";
  document.getElementById('Alarm').style.display = "none";
  var now = new Date();
  var second = now.getSeconds() < 10? "0"+ now.getSeconds() : now.getSeconds();
  var minute = now.getMinutes() < 10? "0"+ now.getMinutes() : now.getMinutes();
  var hour = now.getHours() < 10? "0"+ now.getHours() : now.getHours();
  var date = now.getDate() < 10? "0"+ now.getDate() : now.getDate();
  var month = now.getMonth() + 1 < 10? "0"+ now.getMonth() + 1 : now.getMonth() + 1;
  var day = now.getDay();
  switch (day) {
    case 1:
      day = '(一)';break;
    case 2:
      day = '(二)';break;
    case 3:
      day = '(三)';break;
    case 4:
      day = '(四)';break;
    case 5:
      day = '(五)';break;
    case 6:
      day = '(六)';break;
    case 0:
      day = '(日)';break;
    default:
      break;
  }

  document.getElementById('Date').textContent = now.getFullYear() + "/" + month + "/" + date;
  document.getElementById('UTC').textContent = day + "UTC:" + now.getTimezoneOffset()/-60;
  document.getElementById('Time').textContent = hour + ":" + minute + ":" + second;
}

function count() {
  clearInterval(interval);
  document.getElementById('Clock').style.display = "none";
  document.getElementById('Count').style.display = "block";
  document.getElementById('Alarm').style.display = "none";

}

function alarm() {
  document.getElementById('Clock').style.display = "none";
  document.getElementById('Count').style.display = "none";
  document.getElementById('Alarm').style.display = "block";
}