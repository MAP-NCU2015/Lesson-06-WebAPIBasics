'use strict';
(function(exports){
	var Stopwatch = function(){
		this.minute = 0;
		this.second = 0;
		this.milli = 0;
		this.count = 0;
	}

	Stopwatch.prototype = {

		setWrapper(minute, second, milli) {
			this.minuteWrapper = minute;
			this.secondWrapper = second;
			this.milliWrapper = milli;
		},

		start() {
			this.run = true;
			setInterval(this.count.bind(this), 10);
		},

		pause() {
			this.run = false;
		},

		resume() {
			this.run = true;
		},

		reset() {
			this.run = 0;
			this.count = 0;
			this.preMinute = this.minute;
			this.preSecond = this.second;
			this.preMilli = this.milli;
			this.minute = 0;
			this.second = 0;
			this.milli = 0;
			this.update();
		},

		update() {
			if (this.preMinute != this.minute) {
				$("#" + this.minuteWrapper).text(this.format(this.minute));
			}
			if (this.preSecond != this.second) {
				$("#" + this.secondWrapper).text(this.format(this.second));
			}
			$("#" + this.milliWrapper).text(this.format(this.milli));
		},
		count() {
			if (this.run) {
				this.preMinute = this.minute;
				this.preSecond = this.second;
				this.preMilli = this.milli;
				this.count += 10;
				this.milli = (this.count % 1000) / 10;
				this.second = this.count / 1000;
				this.minute = this.second / 60;
				this.update();
			}
		}
	}
	exports.Stopwatch = Stopwatch;
})(window);
