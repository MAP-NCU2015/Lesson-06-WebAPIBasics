var startflag;
var cc=0;
var ss=0;
var mm=0;
var currTime;
var alarmTime;
start=function(){
	setTime();
	startflag=false;
	timer();
	alarm();
}

setTime=function(){
	var current = new Date();
	var h = current.getHours();
	var m = current.getMinutes();
	var s = current.getSeconds();
	var yr = current.getFullYear();
	var mon = current.getMonth()+1;
	var date = current.getDate();
	var day = current.getDay(day);
	m = addO(m);
	s = addO(s);
	mon = addO(mon);
	date = addO(date);
	currTime=current;
	var d;
	if(day==0)
		d="Sun.";
	else if(day==1)
		d="Mon.";
	else if(day==2)
		d="Tue.";
	else if(day==3)
		d="Wed.";
	else if(day==4)
		d="Thu.";
	else if(day==5)
		d="Fri.";
	else if(day==6)
		d="Sat.";
	document.getElementById('clock').innerHTML = yr+"/"+mon+"/"+date+" "+d+" "+h+":"+m+":"+s;
	if(alarmTime==currTime)
		console.log("Time's Up!");
	var t = setTimeout(setTime, 500);
}
addO=function(i) {
	if(i=="0"||i=="1"||i=="2"||i=="3"||i=="4"||i=="5"||i=="6"||i=="7"||i=="8"||i=="9")
        i="0"+i;
	return i;
}
timer=function(){
	console.log("startflag="+startflag);
	document.getElementById('start').addEventListener('click',function(event) {
      if(startflag == false){
        Timer=setInterval(startTimer, 10);
        startflag=true;
      }
    });
	document.getElementById('stop').addEventListener('click',function(event) {
		clearInterval(Timer);
		startflag=false;
    });
	document.getElementById('reset').addEventListener('click',function(event) {
		stop(Timer);
		document.getElementById('timer').innerHTML = "00:00.00";
		startflag=false;
    });
}
startTimer=function(){
	cc++;
	if(cc==100){
		cc=0;
		ss++;
	}
	if(ss==60){
		ss=0;
		mm++;
	}
	cc=addO(cc);
	ss=addO(ss);
	mm=addO(mm);
	document.getElementById('timer').innerHTML = mm+":"+ss+"."+cc;
}

alarm=function(){
	addOptions();
    document.getElementById('setAlarm').addEventListener('click',function(event) {
		setAlarm();
		console.log("Alarm set.");
	});
}

addOptions=function(){
      min = document.getElementById('minute');
      for(var i=0;i<60;i++){
		  i=addO(i);
		  min.add(new Option(i,i));
      }
      sec = document.getElementById('second');
      for(var i=0;i<60;i++){
		  i=addO(i);
		  sec.add(new Option(i,i));
      }
}

setAlarm=function(){
      var current=new Date();
      var yr=current.getFullYear();
      var mon=current.getMonth();
      var date=current.getDate();
      var h=current.getHours();
      var m=current.getMinutes();
      var s=current.getSeconds();
      var setmin=parseInt(document.getElementById('minute').value);
      var setsec=parseInt(document.getElementById('second').value);
      alarmTime=new Date(yr, mon, date, h, m+setmin, s+setsec, current.getMilliseconds());
    }