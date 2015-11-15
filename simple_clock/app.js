var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var timestart, minute = 0, second = 0, ms = 1;
var start_status = false;
var today;

//display data,time,week,zone
function settime() {
    today = new Date();
    document.clock.date.value = today.toLocaleDateString();
    document.clock.time.value = today.toLocaleTimeString();
    document.clock.week.value = week[today.getDay()];
    document.clock.zone.value = "UTC+"+(today.getTimezoneOffset()/-60);
    TimerID = setTimeout("settime()", 1000);
}

//display stop watch
function start() {
    if(start_status == false){
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

function setalarm() {
    var hour = parseInt(today.getHours());
    var min = parseInt(today.getMinutes());
    var sec = parseInt(today.getSeconds());
    var setmin = parseInt(document.getElementById("setmin").value);
    var setsec = parseInt(document.getElementById("setsec").value);
    if (setmin > 59 || setmin < 0 || isNaN(setmin) || setsec > 59  || 
        setsec < 0 || isNaN(setsec)) {
        alert("Please enter correct value");
    }
    else {
        sec = sec + setsec;
        if (sec + setsec > 59) {
            min += 1;
            sec = (sec + setsec) % 60;
        }

        min = (min + setmin);
        if (min + setmin > 59) {
            hour += 1;
            min = (min + setmin) % 60;
        }
 
        if (hour === 25) {
            hour = 1;
        }
        document.getElementById("alarmtime").innerHTML = "鐘響時間："+hour + ":" + min + ":" + sec;
    }
    check(hour, min, sec);
}

function check(h, m, s) {
    if (today.getHours() == h && today.getMinutes() == m && today.getSeconds() == s) {
        //alert("Time is up");
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        else if (Notification.permission === "granted") {
            var notification = new Notification("起床嘍");
        }
        else if(Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {        
                if (permission === "granted") {
                    var notification = new Notification("time is up!!");  
                }
            });
        }
    }
    checktime = setTimeout(function () { check(h, m, s) }, 1000);
}

window.addEventListener('load', function () {
    Notification.requestPermission(function (status) {
        // This allows to use Notification.permission with Chrome/Safari
        Notification.permission = "granted";
        if (Notification.permission != status) {
            Notification.permission = "granted";
        }
    });
});