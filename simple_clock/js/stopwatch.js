'use strict';
(function(exports) {
    var timer = { //碼表初始值為0Hr0Min0Sec
        hour:0,
        min:0,
        sec:0
    };

    var stopwatch = function(){ //碼表未啟動 false
        this.runstopwatch = false;
    };

    stopwatch.prototype = {
        start(){
            if(this.runstopwatch == false){
                this.runstopwatch = true; //碼表啟動true
                this.interval2 = setInterval(this.runtime.bind(this),1000); //每隔一秒執行一次計時
            }
        },

        pause(){
            if(this.runstopwatch){
                this.runstopwatch = false; //碼表關閉
                clearInterval(this.interval2); //停止執行計時
            }
        },

        reset(){
            if(this.runstopwatch == false){ //重置為0只有在計時停止的時候
                timer.hour = 0;
                timer.min = 0;
                timer.sec = 0;
                $('#timer').text(this.modify(timer.hour) + ":" + this.modify(timer.min) + ":" + this.modify(timer.sec));
            }
        },

        runtime(){
          if(timer.sec == 59){ //59秒時不執行加1秒，直接變1分0秒
              timer.sec = 0;
              timer.min += 1;
          }else if(timer.min == 59){
              timer.min = 0;
              timer.hour += 1;
          }else if(timer.hour == 59){
              timer.hour = 0;
          }else{
              timer.sec += 1; //每隔一秒執行計時器+1秒
          }

          $('#timer').text(this.modify(timer.hour) + ":" + this.modify(timer.min) + ":" + this.modify(timer.sec));
        },

        modify(num){
            var n = num;
            return n < 10? "0"+ n : n;
        }

    }
    exports.stopwatch = stopwatch;
})(window);