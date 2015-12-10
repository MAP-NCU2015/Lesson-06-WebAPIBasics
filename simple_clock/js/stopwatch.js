//碼表
var current_time = "1";
var set_time = "0";
var timerSec = 0;
var timerMin = 0;
var timerHour = 0;
var flag = 0;
document.getElementById('timer').innerHTML = '00:00:00';
document.getElementById('stopwatch_start').onclick = function(){
    if(flag == 0){
    var start = function(){
        flag = 1;
        timerSec += 1 ;
        if(timerSec === 60){
            timerSec = 0 ;
            timerMin += 1 ;
        }
		if(timerMin === 60){
			timerMin = 0 ;
			timerHour += 1;
		}
		var tSec = timerSec > 9 ? timerSec : '0' + timerSec;
		var tMin = timerMin > 9 ? timerMin : '0' + timerMin;
		var tHour = timerHour > 9 ? timerHour : '0' + timerHour;

		var timerNow = tHour + ':' + tMin + ':' + tSec ;
		document.getElementById("timer").innerHTML =  timerNow ;
		}
		var p_timer = setInterval( start ,1000) ;

		document.getElementById('stopwatch_pause').onclick = function(){
  			window.clearInterval(p_timer);
            flag = 0;
  		}

  		document.getElementById('stopwatch_stop').onclick = function(){
            flag = 0;
  		window.clearInterval(p_timer);
  		timerHour = 0 ;
  		timerMin = 0 ;
  		timerSec = 0 ;

  		var tSec = timerSec > 9 ? timerSec : '0' + timerSec;
		var tMin = timerMin > 9 ? timerMin : '0' + timerMin;
		var tHour = timerHour > 9 ? timerHour : '0' + timerHour;

  		var timerNow = tHour + ':' + tMin + ':' + tSec ;
		showTimer.textContent = timerNow ;
  		}
}
}
