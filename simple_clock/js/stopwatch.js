'use strict';
(function(exports) {
    var stopwatch = function() {
        this.startPause = 0;
        this.startTime = 0;
        this.pauseElaspe = 0;
        this.run = false;
    }

    stopwatch.prototype = {

        startstopwatch() {
            if(!this.run && this.startPause !== 0 && this.startTime !== 0) {
                this.pauseElaspe += new Date().getTime() - this.startPause;
            }
            this.run = true;
            if(this.startTime === 0) {
                this.startTime = new Date().getTime();
                setInterval(this.go.bind(this), 10);
            }
        },

        pause() {
            if(this.run){
                this.startPause = new Date().getTime();
                this.run = false;
            }
        },

        reset() {
            if(!this.run) {
                this.startTime = 0;
                this.startPause = 0;
                this.pauseElaspe = 0;
                $('#timer').text("00:00:00");
            }
        },

        go() {
            if (this.run){
                var elapseTime = new Date().getTime() - this.startTime - this.pauseElaspe;
                var milliseconds = elapseTime % 1000;
                var second = Math.floor((elapseTime / 1000) % 60);
                var minute = Math.floor((elapseTime / (60 * 1000)) % 60);
                $('#timer').text(this.format(minute) + ":" + this.format(second) + ":" + this.format(milliseconds));
            }
        },

        format(num) {
            var n = num;
            if (n > 99)
                n = Math.floor(n / 10);
            return n < 10? "0"+ n : n;
        }
    };
    exports.stopwatch = stopwatch;
})(window);