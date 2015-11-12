'use strict';

(function(exports) {
  var ClockManager = function() {

  };

  ClockManager.prototype = {
    start() {
      var now,year,month,day,hour,minute,second,week,zone;
      var map = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth()+1;
      day = now.getDate();
      hour = now.getHours();
      minute = now.getMinutes();
      second = now.getSeconds();
      week = map[now.getDay()];
      zone = now.getTimezoneOffset()/(-60)
      if(second < 10) {
        second = '0' + second;
      }
      if(minute < 10) {
        minute = '0' + minute;
      }
      if(hour < 10) {
        hour = '0' + hour;
      }
      if(zone >= 0) {
        zone = '+'+zone;
      }
      document.getElementById('date').innerHTML = year+'/'+month+'/'+day+" UTC"+zone;
      document.getElementById('time').innerHTML = hour+':'+minute+':'+second+' '+week;
    }
  };

  exports.ClockManager = ClockManager;
})(window);
