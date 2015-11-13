'use strict';
(function(exports) {
    var stopwatch = function() {
        this.startPause = 0;
        this.startTime = 0;
        this.pauseTime = 0;
        this.run = false;
    }

    stopwatch.prototype = {

        startstopwatch() {
			//計算暫停時間
            if(!this.run && this.startPause !== 0 && this.startTime !== 0) {
                this.pauseTime += new Date().getTime() - this.startPause;
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
			if(!this.run){
				this.startTime = 0;
				this.startPause = 0;
				this.pauseTime = 0;
				$('#timer').text("00:00:00");
			}
        },
		
		//顯示計時
        go() {
            if (this.run){
                var timernow = new Date().getTime() - this.startTime - this.pauseTime;
                var milliseconds = timernow % 1000;
                var second = Math.floor((timernow / 1000) % 60);
                var minute = Math.floor((timernow / (60 * 1000)) % 60);
                $('#timer').text(this.modify(minute) + ":" + this.modify(second) + ":" + this.modify(milliseconds));
            }
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