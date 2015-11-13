var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var timestart, minute = 0, second = 0, ms = 1;
var start_status = false;

//display data,time,week,zone
function settime() {
    var today = new Date();
    document.clock.date.value = today.toLocaleDateString();
    document.clock.time.value = today.toLocaleTimeString();
    document.clock.week.value = week[today.getDay()];
    document.clock.zone.value = "UTC+"+(today.getTimezoneOffset()/-60);
    TimerID = setTimeout("settime()", 1000);
}

//display stop watch
function start() {
    console.log(start_status);
    if(start_status == false){
        console.log("start_status");
        start_status = true;
        timestart = setInterval(function(){
            if ((ms % 100) == 0) {
                second += 1;
                ms = 1;
            }
            if (second > 0 && (second % 60) == 0) {
                minute += 1;
                second = 0;
            }
            t = minute + ":" + second + "." + ms;
            document.getElementById("stopwatch_display").value = t;
            ms += 1;
        }, 10);
    }
    else
        //actually do nothing
        start_status = true;
}

function pause() {
    start_status = false;
    clearInterval(timestart);
}

function stop() {
    start_status = false;
    clearInterval(timestart);
    ms = 0;
    minute = second = 0;
    document.getElementById("stopwatch_display").value = minute + ":" + second + "." + ms;
}