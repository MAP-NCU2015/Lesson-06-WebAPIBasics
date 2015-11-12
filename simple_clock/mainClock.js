'use strict';

(function(exports){
	
	var MainClock = function(){
		this.wrapper = null;
	}
	
	MainClock.prototype = {
	
		drawDate(){
			var now  = new Date();
			var weekString = now.toDateString().split(" ")[0];
			var dateString = now.toLocaleDateString().replace("年","/").replace("月","/").replace("日","");

			var displayString = weekString + " " + dateString + " " + now.toTimeString();
			this.wrapper.textContent = displayString;
			//console.log(this);
		},
		
		start(){
			this.wrapper = document.getElementById('main_clock');
			this.drawDate();
			setInterval(this.drawDate.bind(this),100);
		}
	}

	exports.MainClock = MainClock;	
})(window);