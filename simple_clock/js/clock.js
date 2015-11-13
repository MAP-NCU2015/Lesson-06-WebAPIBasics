'use strict';
(function(exports){
    var clock = function () {
        console.log('Clock!');
    }

    clock.prototype = {
        startclock() {
            this.clocktime();
            this.interval = setInterval(this.clocktime.bind(this), 1000); //每x毫秒執行一次
        },

        clocktime() {
            var now = new Date();
            var day = now.getDay();
            switch (day) {
                case 1:
                    day = '(一)';break;
                case 2:
                    day = '(二)';break;
                case 3:
                    day = '(三)';break;
                case 4:
                    day = '(四)';break;
                case 5:
                    day = '(五)';break;
                case 6:
                    day = '(六)';break;
                case 0:
                    day = '(日)';break;
                default:
                    break;
            }

        $('#Date').text(now.getFullYear() + "/" + this.modify(now.getMonth()+1) + "/" + this.modify(now.getDate()) + " " +day);
        $('#UTC').text("UTC:" + now.getTimezoneOffset()/-60);
        $('#Time').text(this.modify(now.getHours()) + ":" + this.modify(now.getMinutes()) + ":" + this.modify(now.getSeconds()));

        },

        modify(num) {
        var n = num;
            return n < 10? "0"+ n : n;
        }

    };

    exports.clock = clock;
})(window);
