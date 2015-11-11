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

		setTrigger(start, pause, resume, reset) {
			this.startTrigger = start;
			this.pauseTrigger = pause;
			this.resumeTrigger = resume;
			this.resetTrigger = reset;
			$("#" + this.startTrigger).click(this.start.bind(this));
			$("#" + this.pauseTrigger).click(this.pause.bind(this)).hide();
			$("#" + this.resumeTrigger).click(this.resume.bind(this)).hide();
			$("#" + this.resetTrigger).click(this.reset.bind(this));
		},

		start() {
			this.run = true;
			setInterval(this.calculate.bind(this), 10);
			$("#" + this.startTrigger).hide();
			$("#" + this.pauseTrigger).show();
		},

		pause() {
			this.run = false;
			console.log("pause");
			$("#" + this.pauseTrigger).hide();
			$("#" + this.resumeTrigger).show();
		},

		resume() {
			this.run = true;
			console.log("resume");
			$("#" + this.resumeTrigger).hide();
			$("#" + this.pauseTrigger).show();
		},

		reset() {
			console.log("reset");
			this.run = 0;
			this.count = 0;
			this.preMinute = this.minute;
			this.preSecond = this.second;
			this.preMilli = this.milli;
			this.minute = 0;
			this.second = 0;
			this.milli = 0;
			this.update();
			$("#" + this.startTrigger).show();
			$("#" + this.pauseTrigger).hide();
			$("#" + this.resumeTrigger).hide();
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

		calculate() {
			if (this.run) {
				this.preMinute = this.minute;
				this.preSecond = this.second;
				this.preMilli = this.milli;
				this.count += 10;
				this.milli = (this.count % 1000) / 10;
				this.second = Math.floor(this.count / 1000) % 60;
				this.minute = Math.floor(this.count / 60000);
				this.update();
			}
		},

		format(num) {
			return num>9 ? num : "0"+num;
		}
	}
	exports.Stopwatch = Stopwatch;
})(window);
