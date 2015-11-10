window.addEventListener("load", function() {
  init();
});

init = function() {
  //main clock
  clockcontent = document.getElementById("clock");
  setclock();
  setInterval(setclock, 10);

  //timer
  t = 0;
  timercontent = document.getElementById("timer");
}

setclock = function() {
  var now = new Date(Date.now());
  var year = now.getFullYear();
  var month = 1 + now.getMonth();
  var date = now.getDate();
  var week = 1 + now.getDay();
  var timezone = now.getTimezoneOffset();

  var hour = "0" + now.getHours();
  var minute = "0" + now.getMinutes();
  var second = "0" + now.getSeconds();

  switch (now.getDay()) {
    case 0:
      day = "星期日";
      break;
    case 1:
      day = "星期一";
      break;
    case 2:
      day = "星期二";
      break;
    case 3:
      day = "星期三";
      break;
    case 4:
      day = "星期四";
      break;
    case 5:
      day = "星期五";
      break;
    case 6:
      day = "星期六";
      break;
    }
  clockcontent.innerHTML = year + "/" + month + "/" + date + " " + day + " " + hour.slice(-2) + ":" + minute.slice(-2) + ":" + second.slice(-2) + "<br> 時區：UTC/GMT " + (timezone>0?"-":"+") + timezone / -60;
}

count = function() {
  t++; 
  timercontent.innerHTML = ("0" + parseInt(t / 6000)).slice(-2) + ":" + ("0" + parseInt(t / 100 % 60)).slice(-2) + "." + ("0" + parseInt(t % 100)).slice(-2);
}

reset = function() {
  t = 0;
  clearInterval(c);
  timercontent.innerHTML = "00:00.00";
}

