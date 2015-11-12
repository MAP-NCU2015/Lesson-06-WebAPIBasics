
var timestart, m = 0, s = 0, ss = 1;

function second() {
    if ((ss % 100) == 0) {
        s += 1;
        ss = 1;
    }

    if (s > 0 && (s % 60) == 0) {
        m += 1;
        s = 0;
    }
    t = m + ":" + s + "." + ss;
    document.getElementById("showtime").value = t;
    ss += 1;
}

function start() {
    timestart = setInterval("second()", 10);
}

function pause() {
    clearInterval(timestart);
}

function stop() {
    clearInterval(timestart);
    ss = 0;
    m = s = 0;
    document.getElementById("showtime").value = m + ":" + s + "." + ss;
}

function showtime() {
    today = new Date();
    document.CLOCK.ALARM.value = today.toLocaleString();
    TimerID = setTimeout("showtime()", 1000);
}

function setalarm() {
    var hour = parseInt(today.getHours());
    var min = parseInt(today.getMinutes());
    var sec = parseInt(today.getSeconds());
    var setmin = parseInt(document.getElementById("setmin").value);
    var setsec = parseInt(document.getElementById("setsec").value);
    if (setmin > 59 || setsec > 59) {
        alert("at most 59min 59sec");
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
        document.getElementById("alarmtime").innerHTML = hour + ":" + min + ":" + sec;
    }
    check(hour, min, sec);
}

function check(h, m, s) {

    if (today.getHours() === h && today.getMinutes() === m && today.getSeconds() === s) {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }
        else if (Notification.permission === "granted") {
            var notification = new Notification("time is up!!");
        }
        else if (Notification.permission !== 'denied') {
 
            Notification.requestPermission(function (status) {
                if (status === "granted") {
                    var notification = new Notification("time is up!!");  
                }
            });
        }

    }
    checktime = setTimeout(function () { check(h, m, s) }, 1000);

}

window.addEventListener('load', function () {
    Notification.requestPermission(function (status) {
        console.log(status);
        // This allows to use Notification.permission with Chrome/Safari
        if (Notification.permission !== status) {
            Notification.permission = status;
        }
    });
});

