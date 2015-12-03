'use strict';
(function(exports) {
    var timer = {
        min:0,
        sec:0,
        millisec:0
    };

    var stopwatch = function(){
        this.runstopwatch = false;
    };

    stopwatch.prototype = {
        start(){
            if(this.runstopwatch == false){
                this.runstopwatch = true;
                this.interval2 = setInterval(this.runtime.bind(this),10);
            }
        },

        pause(){
            if(this.runstopwatch){
                this.runstopwatch = false;
                clearInterval(this.interval2);
            }
        },

        reset(){
            if(this.runstopwatch == false){
                timer.min = 0;
                timer.sec = 0;
                timer.millisec = 0;
                $('#timer').text(this.modify(timer.min) + ":" + this.modify(timer.sec) + ":" + this.modify(timer.millisec));
            }
        },

        runtime(){
          if(timer.millisec == 99){
              timer.millisec = 0;
              timer.sec += 1;
          }else if(timer.sec == 59){
              timer.sec = 0;
              timer.min += 1;
          }else if(timer.min == 59){
              timer.min = 0;
          }else{
              timer.millisec += 1;
          }

          $('#timer').text(this.modify(timer.min) + ":" + this.modify(timer.sec) + ":" + this.modify(timer.millisec));
        },

        modify(num){
            var n = num;
            return n < 10? "0"+ n : n;
        }

    }
    exports.stopwatch = stopwatch;
})(window);