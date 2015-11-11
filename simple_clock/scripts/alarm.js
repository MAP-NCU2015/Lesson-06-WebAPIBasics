'use strict';
(function(exports){
	var Alarm = function(){
	}

	Alarm.prototype = {
		setTrigger(start) {
			this.startTrigger = start;
			$("#" + this.startTrigger).click(this.addAlarm.bind(this));
			navigator.mozSetMessageHandler('alarm', function (mozAlarm) {
				var options = {
					icon: '/icons/icons-16.png',
					body: 'Alarm'
				};
				var notice = new Notification('Alarm Triggered!', options);
				exports.setTimeout(notice.close.bind(notice), 4000);
			});
		},
		setField(minute, second) {
			this.minuteField = minute;
			this.secondField = second;
		},
		addAlarm() {
			var t = new Date();
			var m = $("#" + this.minuteField).val();
			console.log(m);
			var s = $("#" + this.secondField).val();
			console.log(s);
			t.setMinutes(t.getMinutes() + Number(m));
			t.setSeconds(t.getSeconds() + Number(s));
			var request = navigator.mozAlarms.add(t, "ignoreTimezone", {"msg": "time's up"});
			var tmp = this;
			request.onsuccess = function () {
				console.log(request);
				$("#" + tmp.minuteField).attr("disabled", "disabled");
				$("#" + tmp.secondField).attr("disabled", "disabled");
				$("#" + tmp.startTrigger).attr("disabled", "");
				var options = {
					icon: '/icons/icon-16.png',
					body: 'Alarm'
				};
				var notice = new Notification('Alarm Set!', options);
				exports.setTimeout(notice.close.bind(notice), 4000);
			};
			request.onerror = function () { 
				console.log("An error occurred: " + this.error.name);
			};
		}
	};

	exports.Alarm = Alarm;
})(window);
