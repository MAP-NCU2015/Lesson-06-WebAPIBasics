
function toTimer(){
    clearInterval(interval);
    document.getElementById('Clock').style.display = "none";
    document.getElementById('Count').style.display = "block";
    document.getElementById('Alarm').style.display = "none";
}

function startTimer() {
    var startTime = new Date().getTime();
    count(startTime);
    this.timerInterval = setInterval(count, 10, startTime);
}

function pause() {
    clearInterval(timerInterval);
}

function zero() {

}

function count(startTime) {
    var elapseTime = new Date().getTime() - startTime;
    var milliseconds = elapseTime % 1000;
    var second = Math.floor((elapseTime / 1000) % 60);
    var minute = Math.floor((elapseTime / (60 * 1000)) % 60);

    var timer = document.getElementById('timer');
    timer.textContent = format(minute) + ":" + format(second) + ":" + format(milliseconds);

}
