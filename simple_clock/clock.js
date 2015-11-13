'use strict';

(function(exports) {
  var ClockManager = function() {

  };

  ClockManager.prototype = {
    check(a) {
      if(a < 10) {
        a = '0' + a;
        return a;
      } else return a;
    },
    start() {
      var now,year,month,day,hour,minute,second,week,zone;
      var map = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      window.setInterval((function() {
        now = new Date();
        this.year = now.getFullYear();
        this.month = now.getMonth()+1;
        this.day = now.getDate();
        this.hour = now.getHours();
        this.minute = now.getMinutes();
        this.second = now.getSeconds();
        this.week = map[now.getDay()];
        //console.log(now.getDay());
        this.zone = now.getTimezoneOffset()/(-60)
        if(this.zone >= 0) {
          this.zone = '+'+this.zone;
        }
        document.getElementById('date').innerHTML = this.year+'/'+this.check(this.month)+'/'+this.check(this.day)+" UTC"+(this.zone);
        document.getElementById('time').innerHTML = this.check(this.hour)+':'+this.check(this.minute)+':'+this.check(this.second)+' '+this.week;
      }).bind(this),1000)
    }
  };

  exports.ClockManager = ClockManager;
})(window);
