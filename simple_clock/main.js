'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
    var todoclock = new ClockManager();
    todoclock.start();
    setInterval(todoclock.start,1000);
    var todotimer = new TimerManager();
    todotimer.init();
    var todoalarm = new AlarmManager();
});
