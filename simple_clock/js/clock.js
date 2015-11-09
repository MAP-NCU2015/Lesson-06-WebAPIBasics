
function startTictac() {
    document.getElementById('Clock').style.display = "block";
    document.getElementById('Count').style.display = "none";
    document.getElementById('Alarm').style.display = "none";
    tictac();
    this.interval = setInterval(tictac, 1000);
}

function tictac() {
    var now = new Date();
    var day = now.getDay();
    switch (day) {
        case 1:
            day = '(一)';break;
        case 2:
            day = '(二)';break;
        case 3:
            day = '(三)';break;
        case 4:
            day = '(四)';break;
        case 5:
            day = '(五)';break;
        case 6:
            day = '(六)';break;
        case 0:
            day = '(日)';break;
        default:
            break;
    }

    document.getElementById('Date').textContent =
        now.getFullYear() + "/" + format(now.getMonth()+1) + "/" + format(now.getDate());
    document.getElementById('UTC').textContent =
        day + "UTC:" + now.getTimezoneOffset()/-60;
    document.getElementById('Time').textContent =
        format(now.getHours()) + ":" + format(now.getMinutes()) + ":" + format(now.getSeconds());
}

function format(num) {
    if (num > 99)
        num = Math.floor(num / 10);
    return num = num < 10? "0"+ num : num;
}
