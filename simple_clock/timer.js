'use strict';
			
(function(exports) {
	var c=0;
	var s=0;
	var m=0;
	var intval=0;
	var TimerManager = function(){
		this.ready=0;
		
	}
	
	TimerManager.prototype = {
		
		origin(){
			document.getElementById("timer").innerHTML="00:00:00";
			document.getElementById("Start").addEventListener("click",this.start.bind(this));
			document.getElementById("Stop").addEventListener("click",this.stop.bind(this));
			document.getElementById("Reset").addEventListener("click",this.reset.bind(this));
		},
		
		counter(){
			c++;
			if(c>=100)
			{
				c=0;
				s++;
			}
			if(s>=60)
			{
				s=0;
				m++;
			}
			if(m>=60)		
			{
				m=0;
				h++;
			}
		},
		
		zero(x){
			if(x<10)
				x='0'+x;
			return x;	
		},
		
		start(){
			if(this.ready ==0)
			{
				this.ready=1;
				var j=2;
				console.log(1);
				intval=setInterval(function(){
					this.counter();
					document.getElementById("timer").innerHTML=this.zero(m)+":"+this.zero(s)+":"+this.zero(c);
				}.bind(this),10);
			}
		},
		
		stop(){
			if(this.ready == 1)
			{
				console.log(2);
				this.ready=0;
				clearInterval(intval);
			}
		},

		reset(){
			s=0;
			m=0;
			c=0;
			this.ready=0;
			clearInterval(intval);
			document.getElementById("timer").innerHTML="00:00:00";
		}
		
		
	};
	
	exports.TimerManager = TimerManager;
})(window);