'use strict';
(function(exports) {
    var alarm = function(){ //鬧鐘未啟動 false
        this.runalarm = false;
    };

    alarm.prototype = {
        setalarm(m,s){ //傳入使用者設定的時間，並儲存
            this.minute = m;
            this.second = s;
        },

        start(){
            if(this.runalarm == false){
                this.runalarm = true; //開啟鬧鐘
                $('#alarm_time').text(this.modify(this.minute)+":"+this.modify(this.second)); //先顯示使用者所設定的時間
                this.interval1 = setInterval(this.dropping.bind(this),1000); //每隔一秒執行一次扣秒
            }
        },

        cancel(){
            if(this.runalarm){ //只有在鬧鐘跑動時，才需要取消的功能
                this.runalarm = false;
                clearInterval(this.interval1);
                $('#alarm_time').text(this.modify(0)+":"+this.modify(0));
            }
        },

        dropping(){
            if(this.minute == 0 && this.second == 0){
                clearInterval(this.interval1);
                this.runalarm = false;
                if (Notification.permission === "granted"){ //時間到做出提示
                    var notification = new Notification("時間到");
                }
            }else if(this.minute > 0 && this.second == 0){ //在秒等於0的時候，從分鐘借時間，因為省略了底下的減1秒，因此從59秒開始
                this.minute -= 1;
                this.second = 59;
            }else{
                this.second -= 1; //每隔一秒扣一秒
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