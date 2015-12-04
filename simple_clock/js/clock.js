'use strict';
(function(exports){
	var clock = function(){
		//設定星期的內容 day0~6
		this.week = new Array(7);
		this.week[0] = "週日";
		this.week[1] = "週一";
		this.week[2] = "週二";
		this.week[3] = "週三";
		this.week[4] = "週四";
		this.week[5] = "週五";
		this.week[6] = "週六";
	};

	clock.prototype = {
		startclock(){
			this.setClock(); //若沒有先呼叫，要等一秒後時間才會顯示
			this.interval = setInterval(this.setClock.bind(this),1000); //每隔一秒執行一次
		},

		setClock(){
			var now = new Date();
			var day;
			var hour;

			if(now.getHours() >= 12){ //改為12小時制
				day = "下午";
				hour = now.getHours() - 12;
			}else{
				day = "上午"
				hour = now.getHours();
			}
			$('#time').text(this.modify(hour) + ":" + this.modify(now.getMinutes()) + ":" + this.modify(now.getSeconds())+ " " + day);
			$('#date').text(now.getFullYear() + "年" + (now.getMonth()+1) + "月" + now.getDate()+ "日  " + this.week[now.getDay()]);
			$('#utc').text("UTC: " + (-(now.getTimezoneOffset()/60)));
		},

		modify(num){ //補0
			var n = num;
			return n < 10? "0"+ n : n;
		}
	}
	exports.clock = clock;
})(window);