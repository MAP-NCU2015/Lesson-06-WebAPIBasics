addZero = function (num){
	if(num < 10){
		num = "0" + num;
	}
	return num;
}

clock = function(){
	//main clock
	Clock = document.getElementById('Clock');
	displayDate();
	setInterval(displayDate,500);
}

displayDate = function(){
	var now  = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var day = now.getDay();
  var timezone = now.getTimezoneOffset() / 60 * -1;
	switch(day) {
    case 0:
    	day = '星期日';
			break;
    case 1:
			day = '星期一';
			break;
		case 2:
			day = '星期二';
			break;
		case 3:
			day = '星期三';
			break;
		case 4:
			day = '星期四';
			break;
		case 5:
			day = '星期五';
			break;
		case 6:
			day = '星期六';
			break;
	}

	var display =  "Date : " + year + "/" + month + "/"+date + " Time : " + addZero(hour) + ":"+addZero(minute) + ":" + addZero(second) + " " + day + " 目前時區為 : UTC+" + timezone;
	Clock.textContent = display;
}

var min = 0;
var sec = 0;
var millisec = 0;
var isRunning = false;
var displayString;

StopWatch = function(){
	//StopWatch
	stopWatch = document.getElementById('StopWatch');
	displayString = "00:00.00";
	stopWatch.textContent = displayString;

	Start = document.getElementById('Start');
	Pause = document.getElementById('Pause');
	Reset = document.getElementById('Reset');

	Start.addEventListener("click",StartClicked);
	Pause.addEventListener("click",PauseClicked);
	Reset.addEventListener("click",ResetClicked);
	setInterval(counting,10);
}

StartClicked = function(){
	if(isRunning == false){
		isRunning = true;
	}
}

counting = function(){
	if (isRunning == true){
		millisec++;
		if(millisec == 100) {
			sec++;
			millisec = 0;
    }
		if(sec == 60) {
			min++;
			sec = 0;
		}
		displayString = addZero(min) + ":" +addZero(sec) + "."+ addZero(millisec) ;
		stopWatch.textContent = displayString;
	}
}

PauseClicked = function(){
	if(isRunning == true){
		isRunning = false;
	}
}

ResetClicked = function(){
	min = 0;
	sec = 0;
  millisec = 0;
	isRunning = false;
	displayString = "00:00.00" ;
	stopWatch.textContent = displayString;
}

alarm = function(){
	//alarm
	hour = document.getElementById('hour');
	minute = document.getElementById('minute');
	for(var i=0;i<24;i++){
		var temp = document.createElement("option");
		temp.value = i;
		hour.add(temp);
		temp.text = addZero(i);
	}
	for(var i=0;i<60;i++){
		var temp = document.createElement("option");
		temp.value = i;
		minute.add(temp);
		temp.text = addZero(i);
	}
	setAlarmButton = document.getElementById('set_alarm');
	setAlarmButton.addEventListener("click",SetAlarmButton.bind(this));
	navigator.mozSetMessageHandler("alarm", function (alarm) {
		new Notification("ALARM!");
	});
}

SetAlarmButton = function(){
	var Now = new Date();
	var setTime = new Date();

	setTime.setHours(hour.options[hour.selectedIndex].value);
	setTime.setMinutes(minute.options[minute.selectedIndex].value);
	setTime.setSeconds(0);
	setTime.setMilliseconds(0);

  if (Now.getHours() > setTime.getHours() || (Now.getHours() == setTime.getHours() && Now.getMinutes() >= setTime.getMinutes())){
		setTime.setDate(Now.getDate()+1);
	}

	var request = navigator.mozAlarms.add(setTime, "ignoreTimezone");
}
