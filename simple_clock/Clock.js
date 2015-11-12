'use strict';

(function(exports) {
  var time = function() {
    this.setTime();
    var intervalTime = window.setInterval(this.setTime,500);
    var intervalTimer;
    var isstart = false;
    this.reset(intervalTimer);
    
    document.getElementById('start').addEventListener('click',(function(event) {
      if(isstart == false)
      {
        intervalTimer = window.setInterval(this.start,10);
        isstart = true;
      }
    }).bind(this));

    document.getElementById('pause').addEventListener('click',(function(event) {
      this.pause(intervalTimer);
      isstart = false;
    }).bind(this));

    document.getElementById('reset').addEventListener('click',(function(event) {
      this.reset(intervalTimer);
      isstart = false;
    }).bind(this));
  };

  var alarm = function() {
    this.init();
    document.getElementById('setalarm').addEventListener('click',(function(event) {
      this.setalarm();
    }).bind(this));
  };
  var mm = 0;
  var ss = 0;
  var cc = 0;

  time.prototype = {
    setTime() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();
      var hour = today.getHours();
      var minute = today.getMinutes();
      var second = today.getSeconds();
      var day = today.getDay(day);
      var offset = today.getTimezoneOffset();
      offset /= 60;
      offset *= -1;

      if(offset >= 0) 
        offset = "+" + offset;
      month += 1;
      if(month < 10)
        month = "0" + month;
      if(minute < 10)
        minute = "0" + minute;
      if(second < 10)
        second = "0" + second;

      switch(day)
      {
        case 0 : day = 'Sunday';
          break;
        case 1 : day = 'Monday';
          break;
        case 2 : day = 'Tuesday';
          break;
        case 3 : day = 'Wednesday';
          break;
        case 4 : day = 'Thursday';
          break;
        case 5 : day = 'Friday';
          break;
        case 6 : day = 'Saturday';
          break;
      }
      document.getElementById('time').innerHTML= year + " / " + month + " / " + date + "  " + day + " " +  hour + " : " + minute + " : " + second + "  GMT" + offset;
    },

    check(i){
      if(i < 10){
        i = "0" + i;
      }
      return i;
    },

    start(){
      cc++;
      if(cc >= 100){
        ss++;
        cc = 0;
      }
      if(ss >= 60)
      {
        mm++;
        ss = 0;
      }
      if(mm=="0"||mm=="1"||mm=="2"||mm=="3"||mm=="4"||mm=="5"||mm=="6"||mm=="7"||mm=="8"||mm=="9")
        mm = "0" + mm;
      if(ss=="0"||ss=="1"||ss=="2"||ss=="3"||ss=="4"||ss=="5"||ss=="6"||ss=="7"||ss=="8"||ss=="9")
        ss = "0" + ss;
      if(cc=="0"||cc=="1"||cc=="2"||cc=="3"||cc=="4"||cc=="5"||cc=="6"||cc=="7"||cc=="8"||cc=="9")
        cc = "0" + cc;
      document.getElementById('timer').innerHTML= mm + " : " + ss + " . " + cc;
    },

    pause(intervalTimer) {
      clearInterval(intervalTimer);
    },

    reset(intervalTimer) {
      this.pause(intervalTimer);
      mm = 0;
      ss = 0;
      cc = 0;
      mm = this.check(mm);
      ss = this.check(ss);
      cc = this.check(cc);
      document.getElementById('timer').innerHTML= mm + " : " + ss + " . " + cc;
    }
  };

  alarm.prototype = {
    init() {
      this.minute = document.getElementById('minute');
      for(var i=0;i<=59;i++){
        var tmp = document.createElement('option');
        tmp.value = i;
        if(i < 10)
          i = "0" + i;
        tmp.text = i;
        this.minute.add(tmp);
      }
      this.second = document.getElementById('second');
      for(var i=0;i<=59;i++)
      {
        var tmp = document.createElement('option');
        tmp.value = i;
        if(i < 10)
          i = "0" + i;
        tmp.text = i;
        this.second.add(tmp);
      }
      navigator.mozSetMessageHandler('alarm', function (mozAlarm) {
        var notice = new Notification('Alarm Triggered!');
        exports.setTimeout(notice.close.bind(notice), 5000);
      });
    },

    setalarm() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      var date = today.getDate();
      var hour = today.getHours();
      var minute = today.getMinutes();
      var second = today.getSeconds();
      var setmin = parseInt(document.getElementById('minute').value);
      var setsec = parseInt(document.getElementById('second').value);
      var setTime = new Date(year, month, date, hour, minute + setmin, second + setsec, today.getMilliseconds());

      var request = navigator.mozAlarms.add(setTime, "honorTimezone");
        request.onsuccess = function() {
          console.log("The alarm has been scheduled");
        };
        request.error = function() {
          console.log("An error occurred: " + this.error.name);
        };
    }
  };

  exports.time = time;
  exports.alarm = alarm;
})(window);