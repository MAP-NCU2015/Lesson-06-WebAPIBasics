'use strict';

(function (exports) {
  var TimerManager = function() {
    this.msec = 0;
    this.sec = 0;
    this.min = 0;
    this.already = null; //prevent the user from clicking many times if
  }                      //he is already started

  TimerManager.prototype = {
    init() {
      document.getElementById('start').addEventListener('click', (this.start).bind(this));
      document.getElementById('stop').addEventListener('click', (this.stop).bind(this));
      document.getElementById('reset').addEventListener('click', (this.reset).bind(this));
    },
    //do some check for format
    check(a) {
      if(a < 10) {
        a = '0' + a;
        return a;
      } else return a;
    },
    start() {
      if(this.already == null) {
        this.already = exports.setInterval((function() {
          this.msec++;
          if(this.msec==100) {
            this.sec++;
            this.msec=0;
          }
          if(this.sec==60) {
            this.min++;
            this.sec=0;
          }
          if(this.min==60) {
            this.min=0
          }
          document.getElementById('timer').innerHTML = this.check(this.min)+':'+
                                                       this.check(this.sec)+'.'+
                                                       this.check(this.msec);
        }).bind(this),10)
      }
    },
    stop() {
      clearInterval(this.already);
      this.already = null;
    },
    reset() {
      this.stop();
      this.msec = 0;
      this.sec = 0;
      this.min = 0;
      document.getElementById('timer').innerHTML = "00:00.00";
    }
  };

  exports.TimerManager = TimerManager;
})(window);
