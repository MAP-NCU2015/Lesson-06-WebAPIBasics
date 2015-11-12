'use strict';
(function(exports) {
    var alarm = function () {
        for (var i = 0; i < 60; i += 1){
            $('#alarm_second').append('<option value="' + i + '">' + i + '</option>');
            $('#alarm_minute').append('<option value="' + i + '">' + i + '</option>');
        }
        this.run = false;
    }

    alarm.prototype = {
        startAlarm() {
            if(!this.run){
                this.run = true;
                if (window.Notification && Notification.permission !== "granted") {
                    Notification.requestPermission(function (status) {
                        if (Notification.permission !== status) {
                            Notification.permission = status;
                        }
                    });
                }
                this.content = $('#content').val();
                this.min = $('#alarm_minute').val();
                this.sec = $('#alarm_second').val();
                $('#alarm_time').text(this.format(this.min) + ":" + this.format(this.sec));
                this.interval = setInterval(this.dropping.bind(this), 1000);
            }
          },

        dropping() {
            if(this.run){
                if(this.sec == 0 && this.min == 0) {
                    this.run = false;
                    clearInterval(this.interval);
                } else if(this.sec == 1 && this.min == 0) {
                    this.notify();
                    this.sec = this.sec - 1;
                } else if(this.sec == 0 && this.min > 0) {
                    this.min -= 1;
                    this.sec = 59;
                } else {
                    this.sec = this.sec - 1;
                }
                $('#alarm_time').text(this.format(this.min) + ":" + this.format(this.sec));
            }
        },

        notify() {
            if (window.Notification && Notification.permission === "granted") {
                var notify = new Notification(this.content + " is due!");
                notify.show;
            }
        },

        format(num) {
            var n = num;
            if (n > 99)
                n = Math.floor(n / 10);
            return n < 10? "0"+ n : n;
        }

    };


    exports.alarm = alarm;
})(window);