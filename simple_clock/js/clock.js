'use strict';
(function(exports){
	var clock = function(){
		
	}
	
	clock.prototype = {
		startclock(){
			this.datetime();
			setInterval(this.datetime.bind(this),1000);
		},
		
		datetime(){
			var now = new Date();
			var day = now.getDay();
			switch(day){
				case 1:
                    day = '(一)';break;
                case 2:
                    day = '(二)';break;
                case 3:
                    day = '(三)';break;
                case 4:
                    day = '(四)';break;
                case 5:
                    day = '(五)';break;
                case 6:
                    day = '(六)';break;
                case 0:
                    day = '(日)';break;
                default:
                    break;
            }
		
		$('#Date').text(this.modify(now.getMonth()+1) + "/" + this.modify(now.getDate()) + "/" + now.getFullYear() + " " + day);
		$('#UTC').text("UTC:" + now.getTimezoneOffset()/-60);
		$('#Time').text(this.modify(now.getHours()) + ":" + this.modify(now.getMinutes()) + ":" + this.modify(now.getSeconds()));
		
		},
		
		modify(num){
			return num < 10? "0"+ num : num;
		}
		
	};
	
	exports.clock = clock;
})(window);