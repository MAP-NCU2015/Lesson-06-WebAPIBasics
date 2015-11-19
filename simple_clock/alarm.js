'use strict';

(function(exports) {
	var min=document.getElementById("minute");
	var sec=document.getElementById("second");
	var AlarmManager = function(){
		
	}
	
	AlarmManager.prototype ={
		
		start(){
			this.set();
			var b=document.getElementById("Set");
			b.addEventListener("click",this.ready)
			 navigator.mozSetMessageHandler('alarm', function (mozAlarm) {
			var notice = new Notification("RING");
			
			});
		},
		
		set(){
			for(var i=0;i<60;i++)
			{
				var setmin=document.createElement("option");
				setmin.value=i;
				setmin.text=this.zero(i);
				min.add(setmin);
				var setsec=document.createElement("option");
				setsec.value=i;
				setsec.text=this.zero(i);
				sec.add(setsec);
			}
		},
		
		zero(x){
			if(x<10)
				x='0'+x;
			return x;	
		},
		
		ready(){
			var m=min.options[min.selectedIndex].value;
			var s=sec.options[sec.selectedIndex].value;
			var time=(new Date()).getTime();
			time+=m*60*1000+s*1000;
			var date=(new Date()).setTime(time);
			var request = navigator.mozAlarms.add(date,'ignoreTimezone');
			request.onsuccess = function() {
				console.log("good job");
	    	}
			request.onerror = function() {
				console.log('An error occurred: ' + this.error.name);
			}
		}
	}
	
	exports.AlarmManager = AlarmManager;
})(window);