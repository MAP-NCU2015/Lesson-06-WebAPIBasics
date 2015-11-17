window.addEventListener("load", function() {
	Clock();//呼叫時鐘、碼表、鬧鐘
	StopWatch();
 });

Clock = function(){
	Clock = document.getElementById('Clock');
	displayDate();
	setInterval(displayDate,1000);//一秒更新一次
}

displayDate = function(){
	var time = new Date();
	var year = time.getYear()+1900;//西元+1900
	var month = time.getMonth()+1;
	var date = time.getDate();
	var day = time.getDay();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	var timezone = (time.getTimezoneOffset()/60)*(-1);
	
	switch(day){//將day對應星期幾
		case 0 :
			day = '星期日';
			break;
		case 1 :
			day = '星期一';
			break;
		case 2 :
			day = '星期二';
			break;
		case 3 :
			day = '星期三';
			break;
		case 4 :
			day = '星期四';
			break;
		case 5 :
			day = '星期五';
			break;
		case 6 :
			day = '星期六';
			break;
	}
	if( hour < 10 ){
		hour = '0'+hour;
	}
	if( minute < 10 ){
		minute = '0'+minute;
	}
	if( second < 10 ){
		second = '0'+second;
	}
	
	var display_date = "今天是" + year + "/" + month + "/" + date + day;
	var display_time = "現在時間" + hour + ":" + minute + ":" + second + "(時區為 : GMT +" + timezone + ")";
	Clock.textContent = display_date + display_time;
}

var count_0 = 0;//毫秒
var count_1 = 0;//秒
var count_2 = 0;//分鐘
var startflag = 0;//開始flag
StopWatch = function(){
	StopWatch = document.getElementById('StopWatch');
	displayWatch();
	setInterval(displayWatch,10);//0.01秒更新一次
}

displayWatch = function(){
	if(startflag == 1){
		count_0 = count_0+1;
		if(count_0 == 100){
			count_1 = count_1 + 1 ;
			count_0 = 0;
		}
		if(count_1 == 60){
			count_2 = count_2 + 1 ;
			count_1 = 0;
		}
	}	
	var display_count = count_2 + ":" + count_1 + "." + count_0;
	StopWatch.textContent = display_count;
}

startbutton.addEventListener('click', function (event) {//開始
	startflag=1;
});

pausebutton.addEventListener('click', function (event) {//暫停
	startflag=0;
});

resetbutton.addEventListener('click', function (event) {//結束並歸零
	count_0 = 0;
	count_1 = 0;
	count_2 = 0;
	startflag = 0;
});

var alarmBtn = document.querySelector('#alarm');

alarmBtn.addEventListener('click', function (event) {
	var time = new Date();
	var afterminute = document.querySelector('#after_minute').value + time.getMinutes();
	var aftersecond = document.querySelector('#after_second').value + time.getSeconds();
	time.setMinutes(time.getMinutes() +afterminute.value);
	time.setSeconds(time.getSeconds() +aftersecond.value);
	var alarm = navigator.mozAlarms.add(time, 'ignoreTimezone');
});

navigator.mozSetMessageHandler("alarm", function (alarm) {
	new Notification("Time to wake up!!");
});