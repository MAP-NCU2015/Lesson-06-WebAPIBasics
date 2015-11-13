(function(){

	var TimeManager = function(){

	};

	TimeManager.prototype = {		
		start(){
			document.getElementById('showDate').innerHTML = this.date2str();
			setInterval(this.showDate.bind(this),1000);
		},

		showDate(){
            document.getElementById('showDate').innerHTML = this.date2str();
		},

		date2str(){
			var nowDate = new Date();
			var Y = nowDate.getFullYear();
			var M = (nowDate.getMonth()+1<10?"0":"")+(nowDate.getMonth()+1);
			var D = (nowDate.getDate()<10?"0":"")+nowDate.getDate();
			var h = (nowDate.getHours()<10?"0":"")+nowDate.getHours();
			var m = (nowDate.getMinutes()<10?"0":"")+nowDate.getMinutes();
			var s = (nowDate.getSeconds()<10?"0":"")+nowDate.getSeconds();
			var d = this.day2str(nowDate.getDay());
			var zone = (nowDate.getTimezoneOffset()>0?"-":"+")+nowDate.getTimezoneOffset()/-60;
			return Y+"/"+M+"/"+D+" "+h+":"+m+":"+s+" "+d+" GMT"+zone;
		},

		day2str(day){
			var array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			return array[day];
		}
	};

  document.addEventListener('DOMContentLoaded', function(event) {
    var timeManager = new TimeManager();
    timeManager.start();
  });

})();