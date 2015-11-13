'use strict';

// Kick off
document.addEventListener('DOMContentLoaded', function (event) {
    try {
        var clock = new Clock();
        clock.start();
    }
    catch (err) {
        try {
            var countdown = new Countdown();
            countdown.start();
        }
        catch (err) {
            var stopwatch = new Stopwatch();
            stopwatch.start();
        }
    }
});