var timetext;
var watchtimetext;
var start;
var watchtime;
var elapsed;
var timoutid;
var spbutton;
var rebutton;
var opbutton;
var minute;
var second;

//f1 function
function showTime() {
    var now = new Date();
    timetext.innerHTML = now.toLocaleDateString("zh-TW") + " " + now.toDateString().match("\\D{3}") + " " + now.toTimeString();
    setTimeout(showTime, 1000);
}

//f2 function
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

//f3 function
function onOpen() {
    var check = /^\d+$/;
    if (check.test(minute.value) && minute.value < 60 && check.test(second.value) && second.value < 60) {
        var sche = new Date();
        var data = {};
        sche.setTime(sche.getTime() + minute.value * 60 * 1000 + second.value * 1000);
        var request = navigator.mozAlarms.add(sche, "ignoreTimezone", data);
        request.onsuccess = function () {
            console.log("success");
            alert("鬧鐘將在" + minute.value + "分" + second.value + "秒後執行");
        };
        request.onerror = function () {
            console.log(this.error.name);
        };
        navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
            var options = {
                icon: "/icons/icon16x16.png",
                body: "幸運豬肚子餓了"
            }
            var n = new Notification("該起床囉", options);
            setTimeout(n.close.bind(n), 5000);
        });
    }
    else
        alert("時間錯誤");
}

//init
window.addEventListener("load", function () {
    document.querySelector("#main").style.height = screen.height + "px";
    timetext = document.querySelector("#time");
    watchtimetext = document.querySelector("#watchtime");
    minute = document.querySelector("#minute");
    second = document.querySelector("#second");
    spbutton = document.querySelector("#startpause");
    spbutton.addEventListener("click", onStartPause);
    rebutton = document.querySelector("#reset");
    rebutton.addEventListener("click", onReset);
    opbutton = document.querySelector("#open");
    opbutton.addEventListener("click", onOpen);
    watchtime = new Date(0);
    elapsed = new Date(0);
    showTime();
});
