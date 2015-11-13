(function(){

	window.onload = start();

	function start(){
		document.getElementById('showDate').innerHTML = date2str();
		setInterval(showDate,1000); //every second
	};

	function  showDate(){
        document.getElementById('showDate').innerHTML = date2str();
	};

	function  date2str(){
		//convert the date to my form
		var nowDate = new Date();
		var Y = nowDate.getFullYear();
		var M = (nowDate.getMonth()+1<10?"0":"")+(nowDate.getMonth()+1);
		var D = (nowDate.getDate()<10?"0":"")+nowDate.getDate();
		var h = (nowDate.getHours()<10?"0":"")+nowDate.getHours();
		var m = (nowDate.getMinutes()<10?"0":"")+nowDate.getMinutes();
		var s = (nowDate.getSeconds()<10?"0":"")+nowDate.getSeconds();
		var d = day2str(nowDate.getDay());
		var zone = (nowDate.getTimezoneOffset()>0?"-":"+")+nowDate.getTimezoneOffset()/-60;
		return Y+"/"+M+"/"+D+" "+h+":"+m+":"+s+" "+d+" GMT"+zone;
	};

	function  day2str(day){
		//convert day number to its name
		var array = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return array[day];
	};
})();