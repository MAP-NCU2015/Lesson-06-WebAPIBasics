'use strict'

document.addEventListener('DOMContentLoaded',function(event){
    var timeDisplay = new TimeDisplay();
    timeDisplay.start();
    var timer = new Timer();
    timer.start();
    var alarm = new Alarm();
    alarm.start();
});
