'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  var clockManager = new ClockManager();
  clockManager.start();
  var timerManager = new TimerManager();
  timerManager.origin();
  var alarmManager = new AlarmManager();
  alarmManager.start();
});