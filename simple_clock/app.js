window.addEventListener("load", function() {
	Clock();
	StopWatch();
});

Clock = function(){
	Clock = document.getElementById('Clock');
	displayDate();
	setInterval(displayDate,1000);
}

displayDate = function(){
	var time = new Date();
	var year = time.getYear()+1900;
	var month = time.getMonth()+1;
	var date = time.getDate();
	var day = time.getDay();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	var timezone = (time.getTimezoneOffset()/60)*(-1);
	
	switch(day){
		case 0 :
			day = 'Sunday';
			break;
		case 1 :
			day = 'Monday';
			break;
		case 2 :
			day = 'Tuesday';
			break;
		case 3 :
			day = 'Wednesday';
			break;
		case 4 :
			day = 'Thursday';
			break;
		case 5 :
			day = 'Friday';
			break;
		case 6 :
			day = 'Saturday';
			break;
	}
	if(hour < 10){
		hour =  '0' + hour;
	}
	if (minute < 10){
		minute = '0' + minute;
	}
	if(second < 10){
		second = '0' +second;
	}
	var display_date = "Today is " + year + "/" + month + "/" + date + day;
	var display_time = "Now is " + hour + ":" + minute + ":" + second + "(時區為 : GMT +" + timezone + ")";
	Clock.textContent = display_date + display_time;		
}
var count_0 = 0;
var count_1 = 0;
var count_2 = 0;
StopWatch = function(){
	StopWatch = document.getElementById('StopWatch');
	displayWatch();
	setInterval(displayWatch,10);
}

displayWatch = function(){
	if(startflag == 1){
		count_0 = count_0+1;
		if(count_0 == 100){
			count_1 = count_1 + 1 ;
			count_0 = 0;
		}
	}
	var display_count = count_2 + ":" + count_1 + "." + count_0;
	StopWatch.textContent = display_count;
}

startbutton.addEventListener('click', function (event) {
	startflag=1;
});

pausebutton.addEventListener('click', function (event) {
	startflag=0;
});

resetbutton.addEventListener('click', function (event) {
	count_0 = 0;
	count_1 = 1;
	count_2 = 2;
	startflag = 0 ;
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