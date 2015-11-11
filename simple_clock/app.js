function updateDate(timeLabel){
    date = new Date();
    timeLabel.innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
window.addEventListener("load", function() {
    timeLabel = document.querySelector("#timeLabel");
    var updateTimeProccess = window.setInterval(updateDate, 1000, timeLabel);
});
window.addEventListener("click", function(event){
    if(event.target.classList.contains('tab')){
	var id = event.target.dataset.tabId;
	console.log(id);
	document.querySelector(".active").classList.remove("active");
	document.querySelector("#"+id+"Page").classList.add("active");
    }
})
