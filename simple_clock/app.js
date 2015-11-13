function Clock(){
    this.monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    this.weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    this.clockLabel = document.querySelector("#clockLabel");
    this.yearLabel = document.querySelector("#yearLabel");
    this.monthLabel = document.querySelector("#monthLabel");
    this.dateLabel = document.querySelector("#dateLabel");
    this.weekLabel = document.querySelector("#weekLabel");
    this.timezoneLabel = document.querySelector("#timezoneLabel");
    this.timeUpdateProccess = window.setInterval(this.updateDate, 1000, this, clockLabel, yearLabel, monthLabel, dateLabel, weekLabel, timezoneLabel);
    this.minuteSelector = document.querySelector("#minuteSelector");
    this.secondSelector = document.querySelector("#secondSelector");
    this.initTimerSelector(this.minuteSelector, this.secondSelector);
    //TODO: make Timer a independent class.
}
Clock.prototype = {
    updateDate: function(clock, clockLabel, yearLabel, monthLabel, dateLabel, weekLabel, timezoneLabel){
	date = new Date();
	clockLabel.innerHTML = "<p>" + (date.getHours() < 10 ? "0":"") + date.getHours() + "</p>" + ":" +
	    "<p>" + (date.getMinutes() < 10 ? "0":"") + date.getMinutes() + "</p>" + ":" +
	    "<p>" + (date.getSeconds() < 10 ? "0":"") + date.getSeconds() + "</p>";
	yearLabel.innerHTML = date.getFullYear();
	monthLabel.innerHTML = clock.monthNames[date.getMonth()];
	dateLabel.innerHTML = date.getDate();
	weekLabel.innerHTML = clock.weekDayNames[date.getDay()];
	timezoneLabel.innerHTML = "UTC" + (date.getTimezoneOffset() < 0 ? "+":"") + (date.getTimezoneOffset()/-60);
    },
    updateFontSize: function(){
	this.clockLabel.style.fontSize = (window.innerWidth / 6) + "px";
	this.yearLabel.style.fontSize = (window.innerWidth / 16) + "px";
	this.monthLabel.style.fontSize = (window.innerWidth / 30) + "px";
	this.dateLabel.style.fontSize = (window.innerWidth / 8) + "px";
	this.weekLabel.style.fontSize = (window.innerWidth / 30) + "px";
	this.timezoneLabel.style.fontSize = (window.innerWidth / 30) + "px";
	for(log of document.querySelectorAll("#stopwatchLogs li")){
	    log.style.fontSize = (window.innerWidth / 8) + "px";
	}
	document.querySelector("#stopwatchLabel").style.fontSize = (window.screen.width / 8) + "px";
    },
    initTimerSelector: function(minuteSelector, secondSelector){
	for(var i = 0; i < 60; i++){
	    minuteSelector.innerHTML += "<option>"+i+"</option>\n";
	    secondSelector.innerHTML += "<option>"+i+"</option>\n";
	};
    },
    addTimer: function(minuteSelector, secondSelector){
	var date = new Date(Date.now() + 60000*minuteSelector.value + 1000*secondSelector.value);
	var data = {
	    date: date
	}
	var alarm = window.navigator.mozAlarms.add(date, "ignoreTimezone", data);
	alarm.onsuccess = () => {
	    this.popStatus("Alarm Added!");
	}
	alarm.onerror = () => {
	    this.popStatus("Fail to add");
	}
    },
    popStatus: function(str){
	document.querySelector("[role=status]").innerHTML = "<p>"+str+"</p>";
	document.querySelector("[role=status]").classList.add("up");
	setTimeout(function(){
	    document.querySelector("[role=status]").classList.remove("up");
	    document.querySelector("[role=status]").classList.add("down");
	    setTimeout(function(){
		document.querySelector("[role=status]").classList.remove("down");
		document.querySelector("[role=status]").innerHTML = "";
	    },300);
	},1000);
    }
};
function Stopwatch(){
    this.stopwatchTime = 0;
    this.startTime = 0;
    this.stopwatchLogs = document.querySelector("#stopwatchLogs");
    this.stopwatchLogsCount = 0;
    this.stopwatchStopwatchLabel;
    this.stopwatchLabel = document.querySelector("#stopwatchLabel");
    this.stopwatchUpdateProccess = null;
    this.stopwatchTimer = 0;
    this.stoppingToolbar = document.querySelector("#stoppingToolbar");
    this.clockingToolbar = document.querySelector("#clockingToolbar");
    this.isPause = false;
    //TODO: Rename member
};
Stopwatch.prototype = {
    start: function(){
	this.startTime = Date.now();
	this.stopwatchUpdateProccess = window.setInterval(this.updateDate, 1, this.stopwatchLabel, this);
	this.stoppingToolbar.classList.remove("active");
	this.clockingToolbar.classList.add("active");
	this.isPause = false;
    },
    pause: function() {
	if(this.isPause){
	this.stopwatchUpdateProccess = window.setInterval(this.updateDate, 1, this.stopwatchLabel, this);
	    this.isPause = false;
	}else{
	    window.clearInterval(this.stopwatchUpdateProccess);
	    this.isPause = true;
	}
    },
    split: function(updateFontSize){
	var numOnLeft = "<i>" + (++this.stopwatchLogsCount) + "</i>";
	this.stopwatchLogs.innerHTML += "<li>" + numOnLeft + this.stopwatchLabel.innerHTML + "</li>";
	updateFontSize();
	window.scroll(0,document.body.clientHeight);
    },
    reset: function(){
	this.startTime = 0;
	this.stopwatchLogsCount = 0;
	this.stopwatchLabel.innerHTML = "0:00.000";
	this.stoppingToolbar.classList.add("active");
	this.clockingToolbar.classList.remove("active");
	this.stopwatchLogs.innerHTML = "";
	window.clearInterval(this.stopwatchUpdateProccess);
    },
    updateDate: function(stopwatchLabel, stopwatch){
	stopwatch.stopwatchTimer = Date.now() - stopwatch.startTime;
	stopwatchLabel.innerHTML = Math.floor(stopwatch.stopwatchTimer/60000) + ":" +
	    (Math.floor(stopwatch.stopwatchTimer/1000)%60 < 10 ? "0":"") +
	    Math.floor(stopwatch.stopwatchTimer/1000)%60 + "." +
	    ((stopwatch.stopwatchTimer%1000 < 100)?
	     (stopwatch.stopwatchTimer%1000 < 10)?
	     "00":"0":"") +
	    (stopwatch.stopwatchTimer%1000);
    }
};
window.addEventListener("load", function() {
    clock = new Clock();
    clock.stopwatch = new Stopwatch();
    window.addEventListener("click", function(event){
	if(event.target.classList.contains('tab')){
	    var id = event.target.dataset.tabId;
	    document.querySelector(".page.active").classList.remove("active");
	    document.querySelector(".bb-tablist .active").classList.remove("active");
	    document.querySelector("#"+id+"Page").classList.add("active");
	    event.target.classList.add("active");
	    console.log(document.querySelector("[data-tab-id="+event.target.dataset.tabId+"]"));
	}else if(event.target.id == "addTimerBtn"){
	    this.addTimer(this.minuteSelector, this.secondSelector);
	}else if(event.target.id == "startStopWatch"){
	    this.stopwatch.start();
	}else if(event.target.id == "pauseStopWatch"){
	    this.stopwatch.pause();
	}else if(event.target.id == "resetStopWatch"){
	    this.stopwatch.reset();
	}else if(event.target.id == "splitStopWatch"){
	    this.stopwatch.split(clock.updateFontSize);
	}
    }.bind(clock));
    window.onresize = clock.updateFontSize();
    window.screen.onmozorientationchange = function(){clock.updateFontSize()};
});
navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
    var options = {
	body: "Your tea is done, drink it when it still hot!"
    };
    var notification = new Notification("Time up!", options);
    setTimeout(notification.close().bind(notification), 30000);
});

