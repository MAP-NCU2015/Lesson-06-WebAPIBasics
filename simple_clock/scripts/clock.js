'use strict';
(function(exports){
	var Clock = function(){
		this.run = false;
	}

	Clock.prototype = {

		start() {
			this.run = true;
			var tmp = this;
			setInterval(this.update.bind(this), 1000);
		},

		setWrapper(timezone, week, year, month, date, hour, minute, second) {
			this.timezone = timezone;
			this.week = week;
			this.year = year;
			this.month = month;
			this.date = date;
			this.hour = hour;
			this.minute = minute;
			this.second = second;
		},

		update() {
			if (this.run) {
				var now = new Date();
				var timezone = now.getTimezoneOffset()/(-60);
				timezone = timezone>0? "+"+timezone : timezone;
				$("#" + this.timezone).text(timezone);
				$("#" + this.week).text(now.getWeek());
				$("#" + this.month).text(this.format(now.getMonth() + 1));
				$("#" + this.year).text(now.getFullYear());	
				$("#" + this.date).text(this.format(now.getDate()));
				$("#" + this.hour).text(this.format(now.getHours()));
				$("#" + this.minute).text(this.format(now.getMinutes()));
				$("#" + this.second).text(this.format(now.getSeconds()));
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
