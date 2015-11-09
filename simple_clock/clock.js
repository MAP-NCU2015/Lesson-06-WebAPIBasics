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

    Clock.prototype = {
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
        }
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

    exports.Clock = Clock;
    exports.Stopwatch = Stopwatch;
})(window);