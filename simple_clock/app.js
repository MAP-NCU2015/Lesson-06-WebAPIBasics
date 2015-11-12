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
}
window.addEventListener("load", function() {
    clockLabel = document.querySelector("#clockLabel");
    yearLabel = document.querySelector("#yearLabel");
    monthLabel = document.querySelector("#monthLabel");
    dateLabel = document.querySelector("#dateLabel");
    weekLabel = document.querySelector("#weekLabel");
    timezoneLabel = document.querySelector("#timezoneLabel");
    var updateTimeProccess = window.setInterval(updateDate, 1000, clockLabel, yearLabel, monthLabel, dateLabel, weekLabel, timezoneLabel);
});
window.addEventListener("click", function(event){
    if(event.target.classList.contains('tab')){
	var id = event.target.dataset.tabId;
	document.querySelector(".active").classList.remove("active");
	document.querySelector("#"+id+"Page").classList.add("active");
    }
})
window.onresize = updateFontSize();
window.screen.orientation.onchange = function(){updateFontSize()};
