window.addEventListener("load", function() {
  Clock();
});
window.addEventListener("load", function() {
  Stopwatch();
});
window.addEventListener("load", function() {
  Alarm();
});

Clock = function(){
	displayClock();
	setInterval(displayClock, 500);
};

displayClock = function(){
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
	document.getElementById('main_date').innerHTML ="Date : "+year+
	"/"+month+
	"/"+date+
	" "+day;
	document.getElementById('main_clock').innerHTML = "Time : "+check(hour) +
	 ':' + check(minute) +
	 ':' + check(second)+
	 " 目前時區為 : UTC+"+
	 timezone;
}

Stopwatch = function(){
    var min = 0;
    var sec = 0;
    var millisec = 0;
    var timer = null;
    var run = false;
    stopWatch = document.getElementById('stopwatch_list');
    //console.log("stopWatch");
    //console.log(stopWatch);
    document.getElementById('start_button').addEventListener('click', function(event) {
        if(run === false) {
          	run = true;
            timer = setInterval(running, 10);
            //console.log("OK");
        }            
    });

    running = function(){
	    millisec++;
    	if(millisec == 100) {
       		sec++;
	   		millisec = 0;
   		}
  	 	if(sec == 60) {
    	    min++;
       		sec = 0;
    	}          	
   	 	stopWatch.textContent = check(min) + ':' + check(sec) + '.' + check(millisec);
	}

    document.getElementById('pause_button').addEventListener('click', function(event) {
    	if(run === true) {
        	clearInterval(timer);
      		run = false;
      	}
    });

    document.getElementById('reset_button').addEventListener('click', function(event) {
        clearInterval(timer);
      	run = false;
        min = 0;
       	sec = 0;
       	millisec = 0; 
       	stopWatch.textContent = check(min) + ':' + check(sec) + '.' + check(millisec);
    });            
};

check = function(i){
    return (i < 10) ? ('0' + i) : i;
};

Alarm = function(){
    alarmPlayer = document.getElementById('alarm');
	var sec = document.getElementById('sec');
	var min = document.getElementById('min');
	//console.log("sec");
	//console.log(sec);
	//console.log(min);
	for(i=1;i<60;i++){
		var temp = document.createElement("option");
		temp.value = i;
		temp.text = i;
		sec.add(temp);
	}
	for(i=0;i<60;i++){
		var temp = document.createElement("option");
		temp.value = i;
		temp.text = i;
		min.add(temp);
	}
	sec.options[new Date().getSeconds()].selected = true;
	min.options[new Date().getMinutes()].selected = true;
	
	//setAlarmButton = document.getElementById('set_alarm');
};
    
    

