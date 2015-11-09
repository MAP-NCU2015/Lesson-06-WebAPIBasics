
function startAlarm() {
    clearInterval(interval);
    document.getElementById('Clock').style.display = "none";
    document.getElementById('Count').style.display = "none";
    document.getElementById('Alarm').style.display = "block";
}
