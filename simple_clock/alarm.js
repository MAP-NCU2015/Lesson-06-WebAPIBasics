'use strict';

(function (exports) {
  var AlarmManager = function() {
    this.minute = null;
    this.sec = null;
    this.setalarmbutton = null;
  };

  AlarmManager.prototype = {
    init() {
     // Notification.requestPermission();
      this.minute = document.getElementById('minute');
      this.sec = document.getElementById('sec');
      for(var i=0;i<60;i++) {
        var t = document.createElement('option');
        t.value = i;
        if(i < 10) {
          i = '0' + i;
        }
        t.text = i;
        this.minute.add(t);
      }
      for(var i=0;i<60;i++) {
        var t = document.createElement('option');
        t.value = i;
        if(i < 10) {
          i = '0' + i;
        }
        t.text = i;
        this.sec.add(t);
      }
      this.setalarmbutton = document.getElementById('set');
      this.setalarmbutton.addEventListener('click',(this.countdown).bind(this));
      navigator.mozSetMessageHandler('alarm', function (mozAlarm) {
        var notice = new Notification("YOU RAISE ME UP~");
        setTimeout(notice.close.bind(notice), 5000);
      });
    },
    countdown() {
      var currenttime = new Date();
      var alarmtime = new Date();
      alarmtime.setMinutes(this.minute.options[this.minute.selectedIndex].value);
      alarmtime.setSeconds(this.sec.options[this.sec.selectedIndex].value);
      //console.log(this.minute.options[this.minute.selectedIndex].value);
      var request = navigator.mozAlarms.add(alarmtime,'ignoreTimezone');
      request.onsuccess = function() {
        console.log('The alarm has been scheduled.');
      }
      request.onerror = function() {
        console.log('An error occurred: ' + this.error.name);
      }
    }
  };

  exports.AlarmManager = AlarmManager;
})(window);
