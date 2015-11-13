'use strict';

document.addEventListener('DOMContentLoaded', function(event) {     //DOMContentLoaded事件是當document被完整的讀取跟解析後就會被觸發
    var clock = new Clock();                                        //不會等待 stylesheets, 圖片和subframes完成讀取  (load事件可以用來作為判斷頁面已經完整讀取的方法).
    clock.showtime();
    setInterval(clock.showtime, 500);
    var stopwatch = new Stopwatch();
    stopwatch.init();
    var alarm = new Alarm();
    alarm.init();
});
