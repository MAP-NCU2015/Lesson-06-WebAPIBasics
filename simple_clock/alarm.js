(function(){

	var min = document.getElementById('min');
  	var sec = document.getElementById('sec');
  	var set_btn = document.getElementById('set');

  	window.onload = init();

	function init(){
		//select bar
		for(var i=0; i<60; i++) {
	    	var temp = document.createElement('option');
	    	var temp2 = document.createElement('option');
	    	temp.value = i;
	    	temp2.value = i;
	    	temp.text = (temp<10?"0"+i:i);
	    	temp2.text = (temp2<10?"0"+i:i);
	    	min.add(temp);
	    	sec.add(temp2);
      	}
   		set_btn.addEventListener('click', countDown);
   		//callback function
   		navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
            new Notification("┌(O_O)┘ ~~~~~~~Ring"); 
        });  	
	};

	function countDown() {
		Notification.requestPermission();
		var m = min.options[min.selectedIndex].value;
		var s = sec.options[sec.selectedIndex].value;
	    var alarmTime = (new Date()).getTime();

	    alarmTime += (m*60 + s)*1000;
	    var date = (new Date()).setTime(alarmTime);
	    var request = navigator.mozAlarms.add(date,'ignoreTimezone');

	    request.onsuccess = function() {
	    	//set successful message
	    	document.getElementById('msg').innerHTML = "After " + (m<2?m+" minute ":m+" minutes ") + (s<2?s+" second":s+" seconds") + " will ring~~";
	    }
	    request.onerror = function() {
	    	console.log('An error occurred: ' + this.error.name);
	    }
    }

})();