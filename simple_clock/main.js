'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todoclock = new ClockManager();
    todoclock.start();
    var todotimer = new TimerManager();
    todotimer.init();
    var todoalarm = new AlarmManager();
    todoalarm.init();
});
