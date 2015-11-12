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
	this.min = 0;
	this.sec = 0;
    this.millisec = 0;
	isRunning = false;
	stopWatch = document.getElementById('StopWatch');
	
	if(millisec=="0"||millisec=="1"||millisec=="2"||millisec=="3"||millisec=="4"||millisec=="5"||millisec=="6"||millisec=="7"||millisec=="8"||millisec=="9")
        millisec = "0" + millisec;
    if(sec=="0"||sec=="1"||sec=="2"||sec=="3"||sec=="4"||sec=="5"||sec=="6"||sec=="7"||sec=="8"||sec=="9")
        sec = "0" + sec;
    if(min=="0"||min=="1"||min=="2"||min=="3"||min=="4"||min=="5"||min=="6"||min=="7"||min=="8"||min=="9")
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
	this.millisec++;
	if(this.millisec == 100) {
		this.sec++;
		this.millisec = 0;
    }
	if(this.sec == 60) {
		this.min++;
		this.sec = 0;
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
	if(millisec=="0"||millisec=="1"||millisec=="2"||millisec=="3"||millisec=="4"||millisec=="5"||millisec=="6"||millisec=="7"||millisec=="8"||millisec=="9")
        millisec = "0" + millisec;
    if(sec=="0"||sec=="1"||sec=="2"||sec=="3"||sec=="4"||sec=="5"||sec=="6"||sec=="7"||sec=="8"||sec=="9")
        sec = "0" + sec;
    if(min=="0"||min=="1"||min=="2"||min=="3"||min=="4"||min=="5"||min=="6"||min=="7"||min=="8"||min=="9")
        min = "0" + min;	
	var displayString = min +":"+sec +"."+millisec ;
	stopWatch.textContent = displayString;
}

alarm = function(){
	//alarm
	this.hour = document.getElementById('hour');
	this.minute = document.getElementById('minute');
	for(var i=0;i<24;i++){
		var temp = document.createElement("option");
		if (i < 10){
			i = '0'+i;
		}
		temp.value = i;
		temp.text = i;
		this.hour.add(temp);
	}
	for(var i=0;i<60;i++){
		var temp = document.createElement("option");
		if (i < 10){
			i = '0'+i;
		}
		temp.value = i;
		temp.text = i;
		this.minute.add(temp);
	}
	this.hour.options[new Date().getHours()].selected = true;
	this.minute.options[new Date().getMinutes()].selected = true;
	
	this.setAlarmButton = document.getElementById('set_alarm');
	this.setAlarmButton.addEventListener("click",SetAlarmButton.bind(this));
	
	navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
		var options = {
			icon: "/icons/icon16x16.png",
			body: "Alarm!!"
		}
		var notice = new Notification("Alarm triggered",options);
		setTimeout(notice.close.bind(notice), 4000); 
	});
}

SetAlarmButton = function(){
	var Now = new Date();
	var alarmTime = new Date();
	alarmTime.setHours(hour.options[hour.selectedIndex].value);
	alarmTime.setMinutes(minute.options[minute.selectedIndex].value);
	alarmTime.setSeconds(0);
	alarmTime.setMilliseconds(0);
	if(Now.getHours() > alarmTime.getHours() ){
		alarmTime.setDate(Now.getDate() + 1);
	}
	else if(Now.getHours() == alarmTime.getHours()) {
		if(Now.getMinutes() > alarmTime.getMinutes()) {
			alarmTime.setDate(Now.getDate() + 1);
	    }
	}
	var data = {};
	var request = navigator.mozAlarms.add(alarmTime, "ignoreTimezone", data);
	request.onsuccess = function () {
		console.log("The alarm has been scheduled");
		var options = {
			icon: "/icons/icon16x16.png",
			body: "alarm set"
	    };
		var notice = new Notification("Alarm Set!",options);
		setTimeout(notice.close.bind(notice), 4000); 
	};
	request.onerror = function () { 
		console.log("An error occurred: " + this.error.name);
	};
}





