'use strict';

(function(exports) {
	var ShowClock = function() {
		this.clockTitle=document.getElementById('clockTitle');
		
		
	};

	ShowClock.prototype = {
		start: function()
		{
			this.display();
			this.setIntervalUpdate();	
		},
		
		display: function()
		{
			this.clockTitle.innerHTML=new Date();
		},

		setIntervalUpdate: function()
		{
			var clockIntervalId=window.setInterval(this.display, 1000);
		}	
	};

	exports.ShowClock = ShowClock;

  

})(window);