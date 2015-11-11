window.addEventListener('DOMContentLoaded', function (event) {
  var controller = new Controller();
  controller.initialize();
  document.querySelector('#clockButton').onclick = callClock;
  document.querySelector('#stopWatchButton').onclick = callStopWatch;
  document.querySelector('#alarmButton').onclick = callAlarm;
});

function callClock() {
  window.dispatchEvent(new CustomEvent('changeMode', { detail: "clock" }));
}

function callStopWatch() {
  window.dispatchEvent(new CustomEvent('changeMode', { detail: "stopWatch" }));
}

function callAlarm() {
  window.dispatchEvent(new CustomEvent('changeMode', { detail: "alarm" }));
}