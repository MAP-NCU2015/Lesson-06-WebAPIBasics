window.addEventListener("load", function() {

  	var showTime = document.querySelector('.nowTime div');
  	var showTimer = document.querySelector('.timer p');
  	var showIfSet = document.querySelector('.already_set p');
  	
  	var iconImage = 'icon16x16'; //Use the icon pic in notification

	var getNowTime = function() {//To get current time

		var nowTime= new Date();
		var tMonth = (nowTime.getMonth()+1) > 9 ? (nowTime.getMonth()+1) : '0'+(nowTime.getMonth()+1);
		var tDate = nowTime.getDate() > 9 ? nowTime.getDate() : '0'+nowTime.getDate();
		var tHours = nowTime.getHours() > 9 ? nowTime.getHours() : '0'+nowTime.getHours();
		var tMinutes = nowTime.getMinutes() > 9 ? nowTime.getMinutes() : '0'+nowTime.getMinutes();
		var tSeconds = nowTime.getSeconds() > 9 ? nowTime.getSeconds() : '0'+nowTime.getSeconds();
		var tDay = nowTime.getDay();
		var tZone = (nowTime.getTimezoneOffset() / 60) < 0 ?  '+' + -(nowTime.getTimezoneOffset() / 60) : nowTime.getTimezoneOffset() / 60 ;

		if(tDay === 1){
			tDay = "一" ;
		}else if(tDay === 2){
			tDay = "二" ;
		}else if(tDay === 3){
			tDay = "三" ;
		}else if(tDay === 4){
			tDay = "四" ;
		}else if(tDay === 5){
			tDay = "五" ;
		}else if(tDay === 6){
			tDay = "六" ;
		}else if(tDay === 7){
			tDay = "日" ;
		}

		nowTime= nowTime.getFullYear()+'/'+ tMonth +'/'+ tDate +' '+ tHours +':'+ tMinutes +':'+ tSeconds  +'\n 星期' + tDay + ' 時區:GMT' + tZone;
		showTime.textContent = nowTime;
	}
	setInterval(getNowTime,1000); //Get current time every second

	showTimer.textContent = '00:00:00' ;
	var already_start = false;
	var timerHour = 0 ;
	var timerMin = 0 ;
	var timerSec = 0 ;

	document.getElementById('start_btn').addEventListener("click", function(){ //Start to count

		if(already_start === false){
  			already_start = true;
			
			var start = function(){
				timerSec += 1 ;//Plus one every time(per second)
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
				showTimer.textContent = timerNow ;
			}
			var p_timer = setInterval( start ,1000) ;
  		}
		
		document.getElementById('pause_btn').addEventListener("click", function(){ //Pause
  			already_start = false;
  			window.clearInterval(p_timer);
  		});

  		document.getElementById('stop_btn').addEventListener("click", function(){ //Resets the timer to zero
  			already_start = false;
  			window.clearInterval(p_timer);
  			timerHour = 0 ;
  			timerMin = 0 ;
  			timerSec = 0 ;

  			var tSec = timerSec > 9 ? timerSec : '0' + timerSec;
			var tMin = timerMin > 9 ? timerMin : '0' + timerMin;
			var tHour = timerHour > 9 ? timerHour : '0' + timerHour;

  			var timerNow = tHour + ':' + tMin + ':' + tSec ;
			showTimer.textContent = timerNow ;
  		});

  	});
  	document.getElementById('set_btn').addEventListener("click", function(){


  		var set_Min = document.getElementById("setMin");
  		var set_Sec = document.getElementById("setSec");

  		var alarmMin = parseInt(set_Min.options[set_Min.selectedIndex].value);
  		var alarmSec = parseInt(set_Sec.options[set_Sec.selectedIndex].value);
  
  		var reciprocal = function(){

  			Notification.requestPermission();//Getting permission
  			function spawnNotification(theBody,theIcon,theTitle){
				var options = {
					body: theBody,
				  	icon: theIcon
				}
				var n = new Notification(theTitle,options);
				setTimeout(n.close.bind(n), 4000); 
			}

  			if(alarmMin === 0 && alarmSec === 0){
  				spawnNotification('It‘s time to wake up!!!','icons/' + iconImage + '.png','Time’s up');//Call notification
  				window.clearInterval(alarm_timer);
  			}else if(alarmSec === 0 && alarmMin != 0){
  				alarmMin -= 1 ;
  				alarmSec = 59;
  			}else{
  				alarmSec -= 1;
  			}
  			
			var tMin = alarmMin > 9 ? alarmMin : '0' + alarmMin;
			var tSec = alarmSec > 9 ? alarmSec : '0' + alarmSec;

			var timerNow =  tMin + ':' + tSec ;
			showIfSet.textContent = timerNow ;
		}
		var alarm_timer = setInterval( reciprocal ,1000) ;
  		
  	});
});

