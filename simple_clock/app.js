var timetext;
var watchtimetext;
var start;
var watchtime;
var elapsed;
var timoutid;
var spbutton;
var rebutton;

function showTime() {
    var now = new Date();
    timetext.innerHTML = now.toLocaleDateString("zh-TW") + " " + now.toDateString().match("\\D{3}") + " " + now.toTimeString();
    setTimeout(showTime, 1000);
}

function onStartPause() {
    if (spbutton.innerHTML == "開始") {
        spbutton.innerHTML = "暫停";
        start = new Date();
        updateWatch();
    }
    else {
        clearTimeout(timoutid);
        spbutton.innerHTML = "開始";
        elapsed.setTime(watchtime.getTime());
    }
}

function onReset() {
    watchtime.setTime(0);
    elapsed.setTime(0);
    clearTimeout(timoutid);
    spbutton.innerHTML = "開始";
    watchtimetext.innerHTML = "00:00.00";
}

function updateWatch() {
    watchtime.setTime(elapsed.getTime() + new Date().getTime() - start.getTime());
    watchtimetext.innerHTML = (watchtime.getMinutes() < 10 ? "0" + watchtime.getMinutes() : watchtime.getMinutes()) + ":" + (watchtime.getSeconds() < 10 ? "0" + watchtime.getSeconds() : watchtime.getSeconds()) + "." + (watchtime.getMilliseconds() / 10 < 10 ? "0" + Math.floor(watchtime.getMilliseconds() / 10) : Math.floor(watchtime.getMilliseconds() / 10));
    timoutid = setTimeout(updateWatch, 10);
}

window.addEventListener("load", function () {
    document.querySelector("#main").style.height = screen.height + "px";
    timetext = document.querySelector("#time");
    watchtimetext = document.querySelector("#watchtime");
    spbutton = document.querySelector("#startpause");
    spbutton.addEventListener("click", onStartPause);
    rebutton = document.querySelector("#reset");
    rebutton.addEventListener("click", onReset);
    watchtime = new Date(0);
    elapsed = new Date(0);
    showTime();
});
