window.addEventListener("load", function() {
  init();
});

function init(){
	alert("in init");
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
