'use strict';
(function(exports){
	var clock = function(){
	};

	clock.prototype = {
		startclock(){
			setInterval(this.setClock.bind(this),100); //由於改成12小時制，需要花時間，因此不以0.1秒做一次更動
		},

		setClock(){
			var now = new Date();
			var day;
			var hour;
			var week = new Array(7);
			week[0] = "週日";
			week[1] = "週一";
			week[2] = "週二";
			week[3] = "週三";
			week[4] = "週四";
			week[5] = "週五";
			week[6] = "週六";
			if(now.getHours() >= 12){
				day = "下午";
				hour = now.getHours() - 12;
			}else{
				day = "上午"
				hour = now.getHours();
			}
			$('#time').text(this.modify(hour) + ":" + this.modify(now.getMinutes()) + ":" + this.modify(now.getSeconds())+ " " + day);
			$('#date').text(now.getFullYear() + "年" + (now.getMonth()+1) + "月" + now.getDate()+ "日  " + week[now.getDay()]);
			$('#utc').text("UTC: " + (-(now.getTimezoneOffset()/60)));
		},

		modify(num){
			var n = num;
			return n < 10? "0"+ n : n;
		}
	}
	exports.clock = clock;
})(window);