'use strict';

(function(exports) {

    var Clock = function(){

    };

    var Stopwatch = function(){
        this.min = null;
        this.second = null;
        this.millisec = null;
        this.timer = null;
    };

    var Alarm = function(){
        this.hour = null;
        this.minute = null;
        this.setAlarmButton = null;
    };

    Clock.prototype = {
        showtime(){
            var now = new Date();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
    
        var timeValue = (hour>= 12) ? "下午 " : "上午 "; // if condition ? true : false
        timeValue += ((hour > 12) ? hour - 12 : hour) + " 點";
        timeValue += ((minute < 10) ? " 0" : " ") + minute + " 分";
        timeValue += ((second < 10) ? " 0" : " ") + second + " 秒";
        clock.innerHTML = timeValue;
        }
        /*
        update() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var date = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            var day = now.getDay();
            var timezone = now.getTimezoneOffset() / 60 * -1;
            if(minute < 10) {
                minute = '0' + minute;
            }
            if(second < 10) {
                second = '0' + second;
            }
            switch(day) {
                case 0:
                day = 'Sunday';
                break;
                case 1:
                day = 'Monday';
                break;
                case 2:
                day = 'Tuesday';
                break;
                case 3:
                day = 'Wednesday';
                break;
                case 4:
                day = 'Thursday';
                break;
                case 5:
                day = 'Friday';
                break;
                case 6:
                day = 'Saturday';
                break;
            }
            if(timezone >= 0) {
                timezone = '+' + timezone;
            }
            document.getElementById('date').innerHTML = year + '/' + month + '/' + date + ' ' + day;
            document.getElementById('time').innerHTML = hour + ':' + minute + ':' + second + ' UTC' + timezone;
        }*/
    };

    Stopwatch.prototype = {
        init() {
            this.min = 0;
            this.sec = 0;
            this.millisec = 0;
            document.getElementById('start').addEventListener('click', (function(event) {
                if(this.timer === null) {
                    this.timer = exports.setInterval(this.start.bind(this), 10);
                }
            }).bind(this));
            document.getElementById('pause').addEventListener('click', (function(event) {
                this.pause();
            }).bind(this));
            document.getElementById('reset').addEventListener('click', (function(event) {
                this.reset();
            }).bind(this));
        },

        check(i) {
            return (i < 10) ? ('0' + i) : i;
        },

        start() {
            this.millisec++;
            if(this.millisec == 100) {
                this.sec++;
                this.millisec = 0;
            }
            if(this.sec == 60) {
                this.min++;
                this.sec = 0;
            }
            document.getElementById('timer').innerHTML = this.check(this.min) + ':' + this.check(this.sec) + '.' + this.check(this.millisec);
        },

        pause() {
            exports.clearInterval(this.timer);
            this.timer = null;
        },

        reset() {
            this.pause();
            this.min = 0;
            this.sec = 0;
            this.millisec = 0;
            document.getElementById('timer').innerHTML = this.check(this.min) + ':' + this.check(this.sec) + '.' + this.check(this.millisec);
        }
    };

    Alarm.prototype = {
        init() {
            this.hour = document.getElementById('hour');
            this.minute = document.getElementById('minute');
            for(var i = 0; i < 24; i++) {
                var temp = document.createElement('option');
                temp.value = i;
                temp.text = i;
                this.hour.add(temp);
            }
            for(var i = 0; i < 60; i++) {
                var temp = document.createElement('option');
                temp.value = i;
                temp.text = i;
                this.minute.add(temp);
            }
            this.hour.options[new Date().getHours()].selected = true;
            this.minute.options[new Date().getMinutes()].selected = true;
            this.setAlarmButton = document.getElementById('set_alarm');
            this.setAlarmButton.addEventListener('click', this.setAlarmButtonClicked.bind(this));
            navigator.mozSetMessageHandler('alarm', function (mozAlarm) {
                var options = {
                    icon: '/icons/icons16x16.png',
                    body: 'Alarm'
                };
                var notice = new Notification('Alarm Triggered!', options);
                exports.setTimeout(notice.close.bind(notice), 4000);
            });
        },

        setAlarmButtonClicked() {
            var currentTime = new Date();
            var alarmTime = new Date();
            alarmTime.setHours(this.hour.options[this.hour.selectedIndex].value);
            alarmTime.setMinutes(this.minute.options[this.minute.selectedIndex].value);
            alarmTime.setSeconds(0);
            alarmTime.setMilliseconds(0);
            if(currentTime.getHours() > alarmTime.getHours()) {
                alarmTime.setDate(currentTime.getDate() + 1);
            }
            else if(currentTime.getHours() == alarmTime.getHours()) {
                if(currentTime.getMinutes() > alarmTime.getMinutes()) {
                    alarmTime.setDate(currentTime.getDate() + 1);
                }
            }
            var data = {};
            var request = navigator.mozAlarms.add(alarmTime, 'ignoreTimezone', data);
            request.onsuccess = function() {
                console.log('The alarm has been scheduled.');
                var options = {
                    icon: '/icons/icon16x16.png',
                    body: 'Alarm'
                };
                var notice = new Notification('Alarm Set!', options);
                exports.setTimeout(notice.close.bind(notice), 4000);
            };
            request.error = function() {
                console.log('An error occurred: ' + this.error.name);
            };
        }
    };

    exports.Clock = Clock;
    exports.Stopwatch = Stopwatch;
    exports.Alarm = Alarm;
})(window);
