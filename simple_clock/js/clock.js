'use strict';
(function(exports){
    var clock = function () {
        console.log('Running clock!');
    }

    clock.prototype = {
        startTictac() {
            this.tictac();
            this.interval = setInterval(this.tictac.bind(this), 1000);
        },

        tictac() {
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

        $('#Date').text(now.getFullYear() + "/" + this.format(now.getMonth()+1) + "/" + this.format(now.getDate()));
        $('#UTC').text(day + "UTC:" + now.getTimezoneOffset()/-60);
        $('#Time').text(this.format(now.getHours()) + ":" + this.format(now.getMinutes()) + ":" + this.format(now.getSeconds()));

        },

        format(num) {
        var n = num;
            if (n > 99)
                n = Math.floor(n / 10);
            return n < 10? "0"+ n : n;
        }

    };

    exports.clock = clock;
})(window);
