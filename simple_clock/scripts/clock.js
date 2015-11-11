'use strict';
(function(exports){
	var Clock = function(){
		this.run = false;
	}

	Clock.prototype = {

		start() {
			this.run = true;
			setInterval(this.update.bind(this), 1000);
		},

		setWrapper(timezone, week, year, month, date, hour, minute, second) {
			this.timezoneWrapper = timezone;
			this.weekWrapper = week;
			this.yearWrapper = year;
			this.monthWrapper = month;
			this.dateWrapper = date;
			this.hourWrapper = hour;
			this.minuteWrapper = minute;
			this.secondWrapper = second;
		},

		update() {
			if (this.run) {
				var now = new Date();
				var timezone = now.getTimezoneOffset()/(-60);
				timezone = timezone>0? "+"+timezone : timezone;
				$("#" + this.timezoneWrapper).text(timezone);
				$("#" + this.weekWrapper).text(now.getWeek());
				$("#" + this.monthWrapper).text(this.format(now.getMonth() + 1));
				$("#" + this.yearWrapper).text(now.getFullYear());	
				$("#" + this.dateWrapper).text(this.format(now.getDate()));
				$("#" + this.hourWrapper).text(this.format(now.getHours()));
				$("#" + this.minuteWrapper).text(this.format(now.getMinutes()));
				$("#" + this.secondWrapper).text(this.format(now.getSeconds()));
			}
		},

		run() {
		 this.run = true;
		},
		stop() {
			this.run = false;
		},
		format(num) {
			return num>9 ? num : "0"+num;
		}
	};

	exports.Clock = Clock;
})(window);

Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}
