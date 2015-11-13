'use strict';
(function(exports) {
    var stopwatch = function() {
        this.startPause = 0;
        this.startTime = 0;
        this.pauseTime = 0;
    }

    stopwatch.prototype = {

        startstopwatch() {
			//計算暫停時間
            if(this.startPause !== 0 && this.startTime !== 0) {
                this.pauseTime += new Date().getTime() - this.startPause;
            }
            if(this.startTime == 0) {
                this.startTime = new Date().getTime();
            }
			this.interval = setInterval(this.go.bind(this), 10);
        },

        pause() {
			clearInterval(this.interval);
            this.startPause = new Date().getTime();
            this.run = false;
        },

        reset() {
			clearInterval(this.interval);
			this.startTime = 0;
			this.startPause = 0;
			this.pauseTime = 0;
			$('#timer').text("00:00:00");
        },
		
		//顯示計時
        go() {
            var timernow = new Date().getTime() - this.startTime - this.pauseTime;
            var milliseconds = timernow % 1000;
            var second = Math.floor((timernow / 1000) % 60);
            var minute = Math.floor((timernow / (60 * 1000)) % 60);
            $('#timer').text(this.modify(minute) + ":" + this.modify(second) + ":" + this.modify(milliseconds));
        },

        modify(num) {
            var n = num;
            if (n > 99)
                n = Math.floor(n / 10);
            return n < 10? "0"+ n : n;
        }
    };
    exports.stopwatch = stopwatch;
})(window);