'use strict';

(function(exports){
	
	var Alarm = function(){
		this.hour = null;
		this.minute = null;
		this.setButton = null;
		this.alarmTime = null;
	}
	
	Alarm.prototype = {
	
		onsetButtonClicked(){
			var setTaskTime = new Date();
			this.alarmTime = new Date();
			this.alarmTime.setHours(this.hour.options[this.hour.selectedIndex].value);
			this.alarmTime.setMinutes(this.minute.options[this.minute.selectedIndex].value);
			this.alarmTime.setSeconds(0);
			this.alarmTime.setMilliseconds(0);
			
			if(setTaskTime.getHours() > this.alarmTime.getHours() ||
				(setTaskTime.getHours() == this.alarmTime.getHours() &&
				 setTaskTime.getMinutes() > this.alarmTime.getMinutes()) ){
				this.alarmTime.setDate(setTaskTime.getDate() + 1);
			}
	
			var data = {};
			var request = navigator.mozAlarms.add(this.alarmTime, "ignoreTimezone", data);
			request.onsuccess = function () {
				console.log("The alarm has been scheduled");
			};
			request.onerror = function () { 
				console.log("An error occurred: " + request.error.name);// does this line works?
			};
	
			var options = {
				icon: "/icons/icon16x16.png",
				body: "alarm set"
			}
			var n = new Notification("Alarm Set!",options);
			setTimeout(n.close.bind(n), 4000); 
		},
		
		start(){
			//hour and minute selection initialization
			this.hour = document.getElementById('hour');
			this.minute = document.getElementById('minute');
			for(var i=0;i<24;i++){
				var temp = document.createElement("option");
				temp.value = i;
				temp.text = i;
				this.hour.add(temp);
			}
			for(var i=0;i<60;i++){
				var temp = document.createElement("option");
				temp.value = i;
				temp.text = i;
				this.minute.add(temp);
			}
			this.hour.options[new Date().getHours()].selected = true;
			this.minute.options[new Date().getMinutes()].selected = true;
			
			//set alarm button initialization
			this.setButton = document.getElementById('set_alarm');
			this.setButton.addEventListener("click", this.onsetButtonClicked.bind(this));
			
			navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
				var options = {
					icon: "/icons/icon16x16.png",
					body: "alarm triggered"
				}
				var n = new Notification("Alarm triggered",options);
				setTimeout(n.close.bind(n), 4000); 
			});
		}
	}

	exports.Alarm = Alarm;	
})(window);