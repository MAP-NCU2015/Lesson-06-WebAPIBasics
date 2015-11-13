var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function settime() {
    var today = new Date();
    console.log(-today.getTimezoneOffset());
    document.clock.date.value = today.toLocaleDateString();
    document.clock.time.value = today.toLocaleTimeString();
    document.clock.week.value = week[today.getDay()];
    document.clock.zone.value = "UTC+"+(today.getTimezoneOffset()/-60);
    TimerID = setTimeout("settime()", 1000);
}