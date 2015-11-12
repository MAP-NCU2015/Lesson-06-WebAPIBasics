

window.addEventListener("load", function() {
  __init();
});

__init = function(){
	//main clock
	var mainClock = new MainClock();
	mainClock.start();

	//stop watch
	/*
	__running = false;
	__stopWatchStartTime = -1;
	__stopWatchPauseTime = 0;
	__stopWatch = document.getElementById('stop_watch');
	__stopWatch.textContent = '00:00.00';
	
	__startButton = document.getElementById('start_button');
	__pauseButton = document.getElementById('pause_button');
	__resetButton = document.getElementById('reset_button');
	
	__startButton.addEventListener("click",__onStartButtonClicked);
	__pauseButton.addEventListener("click",__onPauseButtonClicked);
	__resetButton.addEventListener("click",__onResetButtonClicked);*/
	
	var stopWatch = new StopWatch();
	stopWatch.start();
	
	//alarm
	/*
	__hour = document.getElementById('hour');
	__minute = document.getElementById('minute');
	for(var i=0;i<24;i++){
		var temp = document.createElement("option");
		temp.value = i;
		temp.text = i;
		__hour.add(temp);
	}
	for(var i=0;i<60;i++){
		var temp = document.createElement("option");
		temp.value = i;
		temp.text = i;
		__minute.add(temp);
	}
	__hour.options[new Date().getHours()].selected = true;
	__minute.options[new Date().getMinutes()].selected = true;
	
	__setAlarmButton = document.getElementById('set_alarm');
	__setAlarmButton.addEventListener("click",__onsetAlarmButtonClicked);
	
	navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
		//alert("Alarm triggered"); 
		var options = {
			icon: "/icons/icon16x16.png",
			body: "alarm triggered"
		}
		var n = new Notification("Alarm triggered",options);
		setTimeout(n.close.bind(n), 4000); 
	});*/
	
	var alarm = new Alarm();
	alarm.start();
	
}

__displayDate = function(){
	var now  = new Date();
	var weekString = now.toDateString().split(" ")[0];
	var dateString = now.toLocaleDateString().replace("年","/").replace("月","/").replace("日","");

	var displayString = weekString + " " + dateString + " " + now.toTimeString();
	__mainClock.textContent = displayString;
}

__onStartButtonClicked = function(){
	console.log(window.performance.now());
	if(__running == false){
		__running = true;
		if(__stopWatchStartTime == -1){
			__stopWatchStartTime = new Date().getTime();
		}else{
			__stopWatchStartTime = __stopWatchStartTime + (new Date().getTime() - __stopWatchPauseTime);
		}
		__watchListTaskID = setInterval(__watchListTask,100);		
	}
}

__watchListTask = function(){
	var timeInms = new Date().getTime() - __stopWatchStartTime; 
	var time = new Date(timeInms);
	var displayString = time.toJSON().slice(14,22);
	__stopWatch.textContent = displayString;
}

__onPauseButtonClicked = function(){
	if(__running == true){
		__stopWatchPauseTime = new Date().getTime();
		clearInterval(__watchListTaskID);
		var timeInms = __stopWatchPauseTime - __stopWatchStartTime; 
		var time = new Date(timeInms);
		var displayString = time.toJSON().slice(14,22);
		__stopWatch.textContent = displayString;
		__running = false;
	}
}

__onResetButtonClicked = function(){
	clearInterval(__watchListTaskID);
	__running = false;
	__stopWatchStartTime = -1;
	__stopWatchPauseTime = 0;
	__stopWatch.textContent = '00:00.00';
}


__onsetAlarmButtonClicked = function(){
	var setTaskTime = new Date();
	__alarmTime = new Date();
	__alarmTime.setHours(__hour.options[__hour.selectedIndex].value);
	__alarmTime.setMinutes(__minute.options[__minute.selectedIndex].value);
	__alarmTime.setSeconds(0);
	__alarmTime.setMilliseconds(0);
	if(setTaskTime.getHours() > __alarmTime.getHours() ||
	   setTaskTime.getMinutes() > __alarmTime.getMinutes() ){
		__alarmTime.setDate(setTaskTime.getDate() + 1);
	}
	
	var data = {};
	var request = navigator.mozAlarms.add(__alarmTime, "ignoreTimezone", data);
	request.onsuccess = function () {
		console.log("The alarm has been scheduled");
	};
	request.onerror = function () { 
		console.log("An error occurred: " + this.error.name);
	};
	
	var options = {
			icon: "/icons/icon16x16.png",
			body: "alarm set"
		}
	var n = new Notification("Alarm Set!",options);
	setTimeout(n.close.bind(n), 4000); 
	
	//window.alert("alarm set!");
}





