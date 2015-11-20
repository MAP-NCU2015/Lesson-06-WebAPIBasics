'use strict';

(function(exports) {
	var Timer = function() {
		this.timerHour=document.getElementById('timerHour');
		this.timerMinute=document.getElementById('timerMinute');
		this.timerSecond=document.getElementById('timerSecond');
	
		this.timerStartButton=document.getElementById('timerStartButton');
		
		this.startFlag=0;
		
	};

	Timer.prototype = {
		start: function()
		{
			this.timerHour.innerHTML=0;
			this.timerMinute.innerHTML=0;
			this.timerSecond.innerHTML=0;
			
			this.timerStartButton.addEventListener('click', function(event) {
				if(this.startFlag==0)
				{
					this.setIntervalUpdate();	
					this.startFlag=1;
					this.timerStartButton.value="暫停";
				}
				else
				{
					clearInterval(this.timerIntervalId);
					this.startFlag=0;
					this.timerStartButton.value="繼續";
				}
			}.bind(this));
			
			
			
		},
		
		setIntervalUpdate: function()
		{
			this.timerIntervalId=window.setInterval(this.changeTimerTime, 1000);		
		},
		
		changeTimerTime: function()
		{
			if(parseInt(this.timerSecond.innerHTML)<59)
			{
				this.timerSecond.innerHTML=parseInt(this.timerSecond.innerHTML)+1;
			}
			else
			{
				if(parseInt(this.timerMinute.innerHTML)<59)
				{
					this.timerMinute.innerHTML=parseInt(this.timerMinute.innerHTML)+1;
					this.timerSecond.innerHTML=0;
				}
				else
				{
					this.timerHour.innerHTML=parseInt(this.timerHour.innerHTML)+1;
					this.timerMinute.innerHTML=0;
					this.timerSecond.innerHTML=0;
				}
			}
			
			
			
		
		}
		
	};

	exports.Timer = Timer;

  

})(window);