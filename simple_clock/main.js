'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
    var clock = new Clock();
    clock.showtime();
    setInterval(clock.showtime, 500);
    var stopwatch = new Stopwatch();
    stopwatch.init();
    var alarm = new Alarm();
    alarm.init();
});