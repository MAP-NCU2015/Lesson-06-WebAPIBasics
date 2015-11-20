'use strict';

(function(exports) {
  var clock = function() {
    this.setClockTime();
    var intervalTime=window.setInterval(this.setClockTime,500);
    var intervalTimer;
    var startflag=false;
    this.reset(intervalTimer);
    document.getElementById('start').addEventListener('click',(function(event) {
      if(startflag == false){
        intervalTimer=window.setInterval(this.start,10);
        startflag=true;
      }
    }).bind(this));
    document.getElementById('stop').addEventListener('click',(function(event) {
      this.stop(intervalTimer);
      startflag = false;
    }).bind(this));
    document.getElementById('reset').addEventListener('click',(function(event) {
      this.reset(intervalTimer);
      startflag = false;
    }).bind(this));
  };

  var time = function() {
    this.init();
    document.getElementById('setalarm').addEventListener('click',(function(event) {
      this.setalarm();
    }).bind(this));
  };
  var mm=0;
  var ss=0;
  var cc=0;

  clock.prototype = {
    setClockTime() {
      var current = new Date();
      var year = current.getFullYear();
      var month = current.getMonth()+1;
      var date = current.getDate();
      var hour = current.getHours();
      var minute = current.getMinutes();
      var second = current.getSeconds();
      var day = current.getDay(day);
      var offset = (current.getTimezoneOffset()/60)*(-1);
      if(offset >= 0)
        offset = "+" + offset;
      if(month < 10)
        month = "0" + month;
      if(minute < 10)
        minute = "0" + minute;
      if(second < 10)
        second = "0" + second;
      switch(day)
      {
        case 0:
          day = "Sun.";
          break;
        case 1:
          day = "Mon.";
          break;
        case 2:
          day = "Tue.";
          break;
        case 3:
          day = "Wed.";
          break;
        case 4:
          day = "Thu.";
          break;
        case 5:
          day = "Fri.";
          break;
        case 6:
          day = "Sat.";
          break;
      }
	  document.getElementById('clock').innerHTML= year + "/" + month + "/" + date + " " + day + " " +  hour + ":" + minute + ":" + second + " GMT" + offset;
    },

    check(i) {
      if(i < 10)
        i = "0" + i;
      return i;
    },

    start() {
      cc++;
      if(cc==100){
        ss++;
        cc=0;
      }
      if(ss==60){
        mm++;
        ss=0;
      }
      if(mm=="0"||mm=="1"||mm=="2"||mm=="3"||mm=="4"||mm=="5"||mm=="6"||mm=="7"||mm=="8"||mm=="9")
        mm="0"+mm;
      if(ss=="0"||ss=="1"||ss=="2"||ss=="3"||ss=="4"||ss=="5"||ss=="6"||ss=="7"||ss=="8"||ss=="9")
        ss = "0" + ss;
      if(cc=="0"||cc=="1"||cc=="2"||cc=="3"||cc=="4"||cc=="5"||cc=="6"||cc=="7"||cc=="8"||cc=="9")
        cc = "0" + cc;
      document.getElementById('timer').innerHTML= mm+":"+ss+"."+cc;
    },

    stop(intervalTimer) {
      clearInterval(intervalTimer);
    },

    reset(intervalTimer) {
      this.stop(intervalTimer);
      mm=0;
      ss=0;
      cc=0;
      mm=this.check(mm);
      ss=this.check(ss);
      cc=this.check(cc);
      document.getElementById('timer').innerHTML= mm + ":" + ss + "." + cc;
    }
  };

  time.prototype = {
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
      for(var i=0;i<=59;i++){
        var tmp = document.createElement('option');
        tmp.value = i;
        if(i < 10)
          i = "0" + i;
        tmp.text = i;
        this.second.add(tmp);
      }
      navigator.mozSetMessageHandler('time', function (mozAlarms) {
        var notice = new Notification('Alarm Set!');
        exports.setTimeout(notice.close.bind(notice), 5000);
      });
    },

    setAlarm(){
	  console.log("Alarm set.");
      var current=new Date();
      var year=current.getFullYear();
      var month=current.getMonth();
      var date=current.getDate();
      var hour=current.getHours();
      var minute=current.getMinutes();
      var second=current.getSeconds();
      var setmin=parseInt(document.getElementById('minute').value);
      var setsec=parseInt(document.getElementById('second').value);
      var setClockTime=new Date(year, month, date, hour, minute + setmin, second + setsec, current.getMilliseconds());

	  
      var request=navigator.mozAlarms.add(setClockTime, 'honorTimezone');
        request.onsuccess=function() {
          console.log("Time's up!");
        };
        request.error=function() {
          console.log("Error: " + this.error.name);
        };
    }
  };

  exports.clock = clock;
  exports.time = time;
})(window);