window.addEventListener("load", function() {
	document.getElementById("output").innerHTML = "00:00:00";
  	init();
//  btn_click();
});

function init(){
	display();
	setInterval(display,100);
	
}

function display(){
	var clock_dom = document.getElementById("main_clock");
	var zone = document.getElementById("zone");

	var time = new Date();
	var year = time.getFullYear();
	var mon = time.getMonth()+1;
	var day = time.getDate();
	var hour = time.getHours();
	var min = time.getMinutes();
	var sec = time.getSeconds();
	var GMT = time.getTimezoneOffset()/60;
	zone.textContent = "The local time zone is : GMT " + GMT;
	clock_dom.textContent = year  + "/" + mon + "/" + day +"\n"+ hour + " : " + min + " : "+sec;

}
var time = 0;
var running = 0;
function btn_click(){
	if(running == 0){
		running = 1;
		increment();
		document.getElementById("start").innerHTML = "Pause";
	}else{
		running = 0;
		document.getElementById("start").innerHTML = "Resume";
	}
}
function reset()
{
	running = 0;
	time = 0;
	document.getElementById("start").innerHTML = "Start";
	document.getElementById("output").innerHTML = "00:00:00";
}
function increment()
{	
	
	if(running == 1){
		setTimeout(function(){
			time++ ;
			var hour = Math.floor(time/10/60);
			var mins = Math.floor(time/10/60);
			var secs = Math.floor(time/10 %60);
			var tenths = time % 10;
			if(hour < 10){
				hour = "0" + hour;
			}
			if(mins < 10){
				mins = "0" + mins;
			}
			if(secs < 10){
				secs = "0" + secs;
			}
			document.getElementById("output").innerHTML =hour+":"+ mins + ":" + secs + ":"+"0"+tenths;
			increment();
		},100);
	}
}

var is_click = 0;

function go_off()
{
	if(is_click == 0){
		is_click = 1;
		document.getElementById("setup").innerHTML = "Done";
		alarm_fun();
	}else{
		is_click = 0;
		document.getElementById("setup").innerHTML = "Set_up";
	}
}

function alarm_fun()
{
	
	var input = document.getElementById("alarm");	
	var right_now = new Date();
  	right_now.setSeconds(right_now.getSeconds() +parseInt(input.value));
  	var alarm = navigator.mozAlarms.add(right_now, 'ignoreTimezone');	
}
navigator.mozSetMessageHandler("alarm", function (alarm) {
 new Notification("Alarm~~~~~~~");
});