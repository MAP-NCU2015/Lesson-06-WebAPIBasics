var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
var weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function updateDate(clockLabel, yearLabel, monthLabel, dateLabel, weekLabel, timezoneLabel){
    date = new Date();
    clockLabel.innerHTML = (date.getHours() < 10 ? "0":"") + date.getHours() + ":" +
	(date.getMinutes() < 10 ? "0":"") + date.getMinutes() + ":" +
	(date.getSeconds() < 10 ? "0":"") + date.getSeconds();
    yearLabel.innerHTML = date.getFullYear();
    monthLabel.innerHTML = monthNames[date.getMonth()];
    dateLabel.innerHTML = date.getDate();
    weekLabel.innerHTML = weekDayNames[date.getDay()];
    timezoneLabel.innerHTML = "UTC" + (date.getTimezoneOffset() < 0 ? "+":"") + (date.getTimezoneOffset()/-60);
}
function updateFontSize(){
    clockLabel = document.querySelector("#clockLabel");
    yearLabel = document.querySelector("#yearLabel");
    monthLabel = document.querySelector("#monthLabel");
    dateLabel = document.querySelector("#dateLabel");
    weekLabel = document.querySelector("#weekLabel");
    timezoneLabel = document.querySelector("#timezoneLabel");
    clockLabel.style.fontSize = (window.screen.width / 6) + "px";
    yearLabel.style.fontSize = (window.screen.width / 16) + "px";
    monthLabel.style.fontSize = (window.screen.width / 30) + "px";
    dateLabel.style.fontSize = (window.screen.width / 8) + "px";
    weekLabel.style.fontSize = (window.screen.width / 30) + "px";
    timezoneLabel.style.fontSize = (window.screen.width / 30) + "px";
};
function initTimerSelector(minuteSelector, secondSelector){
    for(var i = 0; i < 60; i++){
	minuteSelector.innerHTML += "<option>"+i+"</option>\n";
	secondSelector.innerHTML += "<option>"+i+"</option>\n";
    };
};
function addTimer(minuteSelector, secondSelector){
    console.log("Add timer: "+minuteSelector.value+":"+secondSelector.value);
    var date = new Date();
    console.log(date.getTime());
    date.setTime(date.getTime() + (1000*480*60) + (60000*(minuteSelector.value)) + (1000*(secondSelector.value)));
    console.log(date.getTime());
    var data = {
	title: "hi"
    }
    var alarm = window.navigator.mozAlarms.add(data, "honorTimezone", date);
    alarm.onerror = function(){
	console.log("error");
    }
    var r = navigator.mozAlarms.getAll();

    r.onsuccess = function () {
	this.result.forEach(function (alarm) {
	    console.log('Id: ' + alarm.id);
	    console.log('date: ' + alarm.date);
	    console.log('respectTimezone: ' + alarm.respectTimezone);
	    console.log('data: ' + JSON.stringify(alarm.data));
	});
    };

    r.onerror = function () {
	console.log("An error occurred: " + this.error.name);
    };
}
window.addEventListener("load", function() {
    clockLabel = document.querySelector("#clockLabel");
    yearLabel = document.querySelector("#yearLabel");
    monthLabel = document.querySelector("#monthLabel");
    dateLabel = document.querySelector("#dateLabel");
    weekLabel = document.querySelector("#weekLabel");
    timezoneLabel = document.querySelector("#timezoneLabel");
    var updateTimeProccess = window.setInterval(updateDate, 1000, clockLabel, yearLabel, monthLabel, dateLabel, weekLabel, timezoneLabel);
    minuteSelector = document.querySelector("#minuteSelector");
    seocndSelector = document.querySelector("#secondSelector");
    initTimerSelector(minuteSelector, secondSelector);
});
window.addEventListener("click", function(event){
    if(event.target.classList.contains('tab')){
	var id = event.target.dataset.tabId;
	document.querySelector(".active").classList.remove("active");
	document.querySelector("#"+id+"Page").classList.add("active");
    }else if(event.target.id == "addTimerBtn"){
	minuteSelector = document.querySelector("#minuteSelector");
	seocndSelector = document.querySelector("#secondSelector");
	addTimer(minuteSelector, secondSelector);
    }
})
window.onresize = updateFontSize();
window.screen.orientation.onchange = function(){updateFontSize()};
navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
    alert("alarm fired");
    console.log('alarm');
});
