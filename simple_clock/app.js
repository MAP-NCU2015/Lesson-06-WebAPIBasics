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
	if(hour < 10) {
		hour = '0' + hour;
	}
	if(minute < 10) {
		minute = '0' + minute;
	}
	if(second < 10) {
		second = '0' + second;
	}
	var display =  "Date : "+year+"/"+month+"/"+date+" Time : "+hour+":"+minute+":"+second+" "+day+" 目前時區為 : UTC+"+timezone;
	Clock.textContent = display;
}

StopWatch = function(){
	//StopWatch
	min = 0;
	sec = 0;
  millisec = 0;
	isRunning = false;
	stopWatch = document.getElementById('StopWatch');

	if(millisec < 10)
      millisec = "0" + millisec;
  if(sec <10)
      sec = "0" + sec;
  if(min <10)
      min = "0" + min;
	var displayString = min +":"+sec +"."+millisec ;
	stopWatch.textContent = displayString;

	Start = document.getElementById('Start');
	Pause = document.getElementById('Pause');
	Reset = document.getElementById('Reset');

	Start.addEventListener("click",StartClicked);
	Pause.addEventListener("click",PauseClicked);
	Reset.addEventListener("click",ResetClicked);
}

StartClicked = function(){
	if(isRunning == false){
		isRunning = true;
		timer = setInterval(counting,10);
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
		if(millisec=="0"||millisec=="1"||millisec=="2"||millisec=="3"||millisec=="4"||millisec=="5"||millisec=="6"||millisec=="7"||millisec=="8"||millisec=="9")
	      millisec = "0" + millisec;
	  if(sec=="0"||sec=="1"||sec=="2"||sec=="3"||sec=="4"||sec=="5"||sec=="6"||sec=="7"||sec=="8"||sec=="9")
	      sec = "0" + sec;
	  if(min=="0"||min=="1"||min=="2"||min=="3"||min=="4"||min=="5"||min=="6"||min=="7"||min=="8"||min=="9")
	      min = "0" + min;
		var displayString = min +":"+sec +"."+millisec ;
		stopWatch.textContent = displayString;
	}
}

PauseClicked = function(){
	if(isRunning == true){
		clearInterval(timer);
		isRunning = false;
	}
}

ResetClicked = function(){
	min = 0;
	sec = 0;
  millisec = 0;
	clearInterval(timer);
	isRunning = false;
	if(millisec < 10)
      millisec = "0" + millisec;
  if(sec <10)
      sec = "0" + sec;
  if(min <10)
      min = "0" + min;
	var displayString = min +":"+sec +"."+millisec ;
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
		if (i < 10){
			i = '0'+i;
		}
		temp.text = i;
	}
	for(var i=0;i<60;i++){
		var temp = document.createElement("option");
		temp.value = i;
		minute.add(temp);
		if (i < 10){
			i = '0'+i;
		}
		temp.text = i;
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
