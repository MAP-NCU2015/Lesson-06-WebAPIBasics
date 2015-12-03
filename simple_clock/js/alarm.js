'use strict';
(function(exports) {
    var alarm = function(){
        this.runalarm = false;
    };

    alarm.prototype = {
        setalarm(m,s){
            this.minute = m;
            this.second = s;
        },

        start(){
            if(this.runalarm == false){
                this.runalarm = true;
                $('#alarm_time').text(this.modify(this.minute)+":"+this.modify(this.second));
                this.interval1 = setInterval(this.dropping.bind(this),1000);
            }
        },

        cancel(){
            if(this.runalarm){
                this.runalarm = false;
                clearInterval(this.interval1);
                $('#alarm_time').text(this.modify(0)+":"+this.modify(0));
            }
        },

        dropping(){
            if(this.minute == 0 && this.second == 0){
                clearInterval(this.interval1);
                this.runalarm = false;
                if (Notification.permission === "granted"){
                    var notification = new Notification("時間到");
                }
            }else if(this.minute > 0 && this.second == 0){
                this.minute -= 1;
                this.second = 59;
            }else{
                this.second -= 1;
            }
            $('#alarm_time').text(this.modify(this.minute)+":"+this.modify(this.second));
        },

        modify(num){
            var n = num;
            return n < 10? "0"+ n : n;
        }
    }
    exports.alarm = alarm;
})(window);