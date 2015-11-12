// Define a function to display the current time
function displayTime() {
	var timeValue,y,m,date,timeValue2;
	var elt = document.getElementById("clock");  // Find element with id="clock"
	var elt2 = document.getElementById("clock1");
	var now = new Date();                        // Get current time
	var d = new initArray("星期日", "星期一","星期二", "星期三","星期四", "星期五", "星期六");
	
	y = now.getFullYear();
	m = now.getMonth();	
	date = now.getDate();
	timeValue = y + "/" + m + "/" + date + " " + d[now.getDay()+1] + " " + now.toLocaleTimeString();
	
	var gmtHours = now.getTimezoneOffset()/60*(-1);
	timeValue2 ="The local time zone is: GMT " + gmtHours;

	elt.innerHTML = timeValue;    // Make elt display it
	elt2.innerHTML = timeValue2;
	setTimeout(displayTime, 1000);               // Run again in 1 second
}
window.onload = displayTime;  // Start displaying the time when document loads.

function initArray()
{

	this.length=initArray.arguments.length;
	for(var i=0;i<this.length;i++)
		this[i+1]=initArray.arguments[i] 
}

