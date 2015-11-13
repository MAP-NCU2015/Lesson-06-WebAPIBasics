'use strict';

(function (exports) {
    /**
     *
     *  @constructor
     *  @this {Clock}
     */
    var start_date;
    var timing;
    var Stopwatch = function () {
        this.start_date = null;
        this.timing = null;
    };
    Stopwatch.prototype = {
        /**
         * 
         * @this {Clock}
         */
        start() {
            window.addEventListener('click', this);
        },
        handleEvent(event) {
            switch (event.type) {
                case 'click':
                    if (event.target.id == 'start') {
                        switch (document.getElementById("start").className) {
                            case 'start':
                                this.start_timing();
                                break;
                            case 'pause':
                                this.pause_timeing();
                                break;
                            case 'resume':
                                this.resume_timing();
                                break;
                        }
                    }
                    if (event.target.id == 'rest') {
                        this.reset_timing();
                    }
                    break;
            }
        },
        start_timing() {
            this.start_date = new Date();
            this.timing = setInterval(this.stopwatch_check.bind(this), 10);
            document.getElementById("start").innerHTML = "分位";
            document.getElementById("start").setAttribute('class', 'pause');
        },
        pause_timeing() {
            clearInterval(this.timing);
            document.getElementById("start").innerHTML = "繼續";
            document.getElementById("start").setAttribute('class', 'resume');
        },
        resume_timing() {
            this.timing = setInterval(this.stopwatch_check.bind(this), 10);
            document.getElementById("start").innerHTML = "分位";
            document.getElementById("start").setAttribute('class', 'pause');
        },
        reset_timing() {
            clearInterval(this.timing);
            document.getElementById("stopwatch_time_display").innerHTML = '00:00.00';
            document.getElementById("start").innerHTML = "開始";
            document.getElementById("start").setAttribute('class', 'start');
        },
        stopwatch_check() {
            var now_date = new Date();
            now_date.setMinutes(now_date.getMinutes() - this.start_date.getMinutes());
            now_date.setSeconds(now_date.getSeconds() - this.start_date.getSeconds());
            now_date.setMilliseconds(now_date.getMilliseconds() - this.start_date.getMilliseconds());
            var now_minute = now_date.getMinutes();
            var now_second = now_date.getSeconds();
            var now_milliseconds = now_date.getMilliseconds();

            if (now_minute < 10)
                now_minute = '0' + now_minute;
            if (now_second < 10)
                now_second = '0' + now_second;
            now_milliseconds = (now_milliseconds / 10).toFixed(0);
            if (now_milliseconds < 10)
                now_milliseconds = '0' + now_milliseconds;
            if (now_milliseconds == '100')
                now_milliseconds = '99';
            document.getElementById("stopwatch_time_display").innerHTML = now_minute + ":" + now_second + "." + now_milliseconds;
        }
    };
    exports.Stopwatch = Stopwatch;
})(window);
document.addEventListener('DOMContentLoaded', function (event) {
    var stopwatch = new Stopwatch();
    stopwatch.start();
});