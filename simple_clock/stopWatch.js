(function(){

	var t1, t2, timer, lastTime, interval, pre;
	var myEl = document.getElementById('start_pause_cont_btn');
	
	window.onload = init();

	function init(){
		myEl.addEventListener("click", start);
		document.getElementById('reset_btn').addEventListener("click", reset);
	};

	function start(){
		t1 = new Date();
		lastTime = t1.getTime();
		pre = 0;
		//change button
		myEl.innerHTML = "Pause";
		myEl.removeEventListener("click", start);
		myEl.addEventListener("click", pause);
		//measure
		interval = setInterval(go, 10);
	};

	function pause(){
		clearInterval(interval);
		pre = timer;
		//change button
		myEl.innerHTML = "Resume";
		myEl.removeEventListener("click", pause);
		myEl.addEventListener("click", resume);
	};

	function resume(){
		var temp = new Date();
		lastTime = temp.getTime();
		interval = setInterval(go, 10);
		//change button
		myEl.innerHTML = "Pause";
		myEl.removeEventListener("click", resume);
		myEl.addEventListener("click", pause);
	};

	function reset(){
		timer = 0;
		pre = 0;
		clearInterval(interval);
		document.getElementById('stopWatch').innerHTML = "00:00.00";
		//change button
		myEl.innerHTML = "Start";		
		myEl.removeEventListener("click", resume);
		myEl.removeEventListener("click", pause);
		myEl.addEventListener("click", start);
	};

	function go(){
		t2 = new Date();
		var currentTime = t2.getTime() + pre;
		timer = currentTime - lastTime;
		var m = Math.floor(timer/10%100);
		var S = Math.floor(timer/1000%60);
		var M = Math.floor(timer/60000%60);
		document.getElementById('stopWatch').innerHTML = (M<10?"0"+M:M)+":"+(S<10?"0"+S:S)+"."+(m<10?"0"+m:m);
	};

})();