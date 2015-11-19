'use strict';

(function(exports) {
	var ClockManager=function(){
		
	}
	ClockManager.prototype = {
		
		start(){
			setInterval((function(){
				this.showtime();
			}).bind(this),1000);
		},
		
		showtime(){
			var now=new Date();
			var week =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var w = week[now.getDay()];
			var z = now.getTimezoneOffset()/(-60);
			if(z>=0)
				z='+'+z;
			var y=now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate()+"  "+w+"   zone:"+z;
			var t=this.zero(now.getHours())+":"+this.zero(now.getMinutes())+":"+this.zero(now.getSeconds());
			document.getElementById("ymd").innerHTML=y;
			document.getElementById("time").innerHTML=t;
		}, 
		
		zero(x){
			if(x<10)
				x='0'+x;
			return x;	
		}
	};
	exports.ClockManager = ClockManager;
})(window);