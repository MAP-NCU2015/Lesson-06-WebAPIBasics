'use strict';

(function(exports) {
	var Alarm = function() {
		this.alarmHour=document.getElementById('alarmHour');
		this.alarmMinute=document.getElementById('alarmMinute');
		this.alarmSecond=document.getElementById('alarmSecond');
		
		this.alarmStartButton=document.getElementById('alarmStartButton');
		
	};

	Alarm.prototype = {
		start: function()
		{
			this.alarmStartButton.addEventListener('click', function(event) {
				
	
			
				this.alarmTime=new Date();
				this.alarmTime.setHours(this.alarmTime.getHours()+parseInt(this.alarmHour.value));
				this.alarmTime.setMinutes(this.alarmTime.getMinutes()+parseInt(this.alarmMinute.value));
				this.alarmTime.setSeconds(this.alarmTime.getSeconds()+parseInt(this.alarmSecond.value));
				
				
				var request = navigator.mozAlarms.add(this.alarmTime, "honorTimezone","time's up");

				request.onsuccess = function () {
				  console.log("The alarm has been scheduled");
				};

				request.onerror = function () { 
				  console.log("An error occurred: " + this.error.name);
				};
				
				navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
				  //alert("alarm fired: " + JSON.stringify(mozAlarm.data)); 
					this.notify(JSON.stringify(mozAlarm.data));
				}.bind(this));
		
			
				
				
			}.bind(this));
		
		
		 
		},
		notify: function(text)
		{
			if (!("Notification" in window)) {
				console.log("This browser does not support desktop notification");
			}

			// Let's check whether notification permissions have alredy been granted
			else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
				var notification = new Notification(text);
			}

			// Otherwise, we need to ask the user for permission
			else if (Notification.permission !== 'denied') {
				Notification.requestPermission(function (permission) {
				// If the user accepts, let's create a notification
					if (permission === "granted") {
						var notification = new Notification("Hi there!");
					}
				});
			}
		}
		
		
	};

	exports.Alarm = Alarm;

  

})(window);