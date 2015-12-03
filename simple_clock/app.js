var day="";
var years,months,date,hours,minutes,seconds,zone;
/***********Clock**************/
function setclock(){ //Set the clock
var nowtime = new Date();
years=nowtime.getYear()+1900;
months=nowtime.getMonth()+1;
date=nowtime.getDate();
hours=nowtime.getHours();
minutes=nowtime.getMinutes();
seconds=nowtime.getSeconds();
if(nowtime.getMonth()<=9)
	months="0"+months;
if(nowtime.getDate()<=9)
	date="0"+date;

var array= ["一", "二","三","四","五","六","日"];//Change day to Chinese
day = array[nowtime.getDay()-1];

if(nowtime.getHours()<=9)
	hours="0"+nowtime.getHours();
if(nowtime.getMinutes()<=9)
	minutes="0"+nowtime.getMinutes();
if(nowtime.getSeconds()<=9)
	seconds="0"+nowtime.getSeconds();
if(nowtime.getTimezoneOffset()>0){
	zone="-"+nowtime.getTimezoneOffset()/-60;
}else{
	zone="+"+nowtime.getTimezoneOffset()/-60;
}
document.getElementById('clock').innerHTML=years+"年"+months+"月"+date+"日 "+"星期"+day+hours+":"+minutes
+":"+seconds+" 時區:UTC"+zone;

requestAnimationFrame(setclock); //update the clock
}
setclock();
/***********Stopwatch**************/
var mm="00",ss="00",cc="00",run=false;
var clockinterval;
function reset(){
	run=0;
	mm="0"+0;
	ss="0"+0;
	cc="0"+0;
	document.getElementById('output').innerHTML=mm+":"+ss+"."+cc;
}
function time(){
	function settime(){
		cc++;
		if(cc<=9){
			cc="0"+cc;
		}
		if(cc%100===0){ 
			cc="0"+0;
			ss++;
			if(ss<=9){
			ss="0"+ss;
			}
			if(ss%60===0){
				ss=0;
				mm++;
				if(mm<=9){
					mm="0"+mm;
				}
			}
		}
	document.getElementById('output').innerHTML=mm+":"+ss+"."+cc;	
	}
	clockinterval=setInterval(settime,10);
}

document.getElementById('start').onclick=function(){
	if(run!=true){
	run=true;
	time();
	}
}
document.getElementById('pause').onclick=function(){
	clearInterval(clockinterval);
	run=false;
}
document.getElementById('reset').onclick=function(){
	reset();
	run=false;
}
/***********Alarm Clock**************/
function alarm(){
	var h=document.getElementById('sethour');
	for(var i=0; i<=24; i++){
		var op=document.createElement('option');
		op.value=i;
		if(i<=9){
		op.text="0"+i;
		}else{
		op.text=i;
		}
		h.add(op);
	}
	var m=document.getElementById('setminute');
	for(var i=0; i<=60; i++){
		var opm=document.createElement('option');
		opm.value=i;
		if(i<=9){
		opm.text="0"+i;
		}else{
		opm.text=i;
		}
		m.add(opm);
	}
	
}
function spawnNotification(theBody,theIcon,theTitle) {
	var options = {
	    body: theBody,
	    icon: theIcon
	}
	var n = new Notification(theTitle,options);
}

document.getElementById('setalarm').onclick=function(){
	var setHr=document.getElementById("sethour");
	var setMin=document.getElementById("setminute");
	var alarmHour = parseInt(setHr.options[setHr.selectedIndex].value);
	var alarmMin = parseInt(setMin.options[setMin.selectedIndex].value);
	document.getElementById('alarmtext').innerHTML ="已將鬧鐘設定為" + setHr.options[setHr.selectedIndex].text +"時" 
	+ setMin.options[setMin.selectedIndex].text + "分";

	function alarmclock(){
		var timeofnow=new Date();
		Notification.requestPermission();
		
		if(timeofnow.getHours()===alarmHour&&timeofnow.getMinutes()===alarmMin&&timeofnow.getSeconds()===0){

	      if (Notification && Notification.permission === "granted") {
	      	spawnNotification("鬧鐘響囉!","icon/icon16x16.png","鬧鐘通知");
	  	  }
		}	
	}
}
alarm();
