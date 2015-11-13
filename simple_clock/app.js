function init(){
  //document.setform.atime.value="0:00:00 AM"
  clock()
}
function clock(){
	var now = new Date();                    // Get current time
	var hour = now.getHours()
	var minute = now.getMinutes()
	var second = now.getSeconds()
	var d = new initArray("星期日", "星期一","星期二", "星期三","星期四", "星期五", "星期六");
	var timeValue, timeValue2;
	var elt = document.getElementById("now");  // Find element with id
	var elt2 = document.getElementById("tzon");
	
	y = now.getFullYear();
	m = now.getMonth();	
	date = now.getDate();
	timeValue = y + "/" + m + "/" + date + " " + d[now.getDay()+1] + " " + now.toLocaleTimeString();
	//document.setform.now.value = timeValue
	
  
	var gmtHours = now.getTimezoneOffset()/60*(-1);
	timeValue2 ="The local time zone is: GMT " + gmtHours;
	
	elt.innerHTML = timeValue;
	elt2.innerHTML = timeValue2;
  
  
	if ((hour==shour) && (minute==sminute) && (second==0) && (document.setform.alarm[0].checked))
		alert(string)
	/*else if ((minute==0) && (second==0) && (document.setform.hourbeep[0].checked))
		alert("Hourly Beep!")*/
	setTimeout("clock()",1000)
} 
var shour=0
var sminute=0
var string="Time is up!"

function setup(){
	//var num1Str = document.getElementById('num1').value;
    //var num2Str = document.getElementById('num2').value;
    /*if (!isNumber(document.setform.sethour.value) || !isNumber(document.setform.sethour.value)){
		alert("Some of the input is not a number!");      
    }*/
	if ((document.setform.sethour.value<0) || (document.setform.sethour.value>23))
		alert("Hour設定超出範圍")
	else if ((document.setform.setminute.value<0) || (document.setform.setminute.value>59))
		alert("Minute設定超出範圍")
	else 
	{
		var elt_ala = document.getElementById("atime");
		if (document.setform.sethour.value!="")
			shour=document.setform.sethour.value
		if (document.setform.setminute.value!="")
			sminute=document.setform.setminute.value
		var alarmvalue = ""+((shour > 12) ? shour-12:shour)
		alarmvalue +=((sminute < 10) ? ":0":":")+sminute+":00"
		alarmvalue +=((shour > 12 ) ? " PM":" AM")
		//document.setform.atime.value = alarmvalue
		elt_ala.innerHTML = alarmvalue;
		document.setform.sethour.value=""
		document.setform.setminute.value=""
	}
}
function initArray()
{

	this.length=initArray.arguments.length;
	for(var i=0;i<this.length;i++)
		this[i+1]=initArray.arguments[i] 
}
var c = 0, s = 0, mm = 0;
       function myCounter() {
          c++;
          if(c==100)
          {
              s++;
              c=0;
          }
           if(s==60)
           {
              mm++;
               s=0;
           }
           document.getElementById("demo").innerHTML = mm + ":" + s + "." +c;
       }
        function reset()
        {
            s=0;
            mm=0;
            c=0;
            document.getElementById("demo").innerHTML = mm + ":" + s + "." +c;
        }