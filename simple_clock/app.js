window.addEventListener("load", function() {
  var intervalID = window.setInterval(updateTime, 1000);
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

  return year + '/' + pad(month, 2) + '/' + pad(date, 2) + ' ' + pad(hour, 2) + ':' + pad(minute, 2) + ':' + pad(second, 2);
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}
