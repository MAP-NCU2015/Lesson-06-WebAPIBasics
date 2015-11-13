'use strict';

(function (exports) {
    /**
     *
     *  @constructor
     *  @this {Clock}
     */
    var Clock = function () {

    };
    Clock.prototype = {
        /**
         * 
         * @this {Clock}
         */
        start() {
            //var date = Date();
            this.time_check();
            var myVar = setInterval(this.time_check, 1000);
        },
        handleEvent(event) {
        },
        time_check() {
            var now_date = new Date();

            document.getElementById("time_display").textContent = now_date.getFullYear() + "/" + (now_date.getMonth() + 1) + "/" + now_date.getDate() + " " + now_date.toTimeString().substring(0, 8);
            document.getElementById("week_display").textContent = now_date.toDateString().substr(0, 4);
            document.getElementById("timezone_display").textContent = now_date.toTimeString().substring(9, 26);

            var passages = ['a'];
            passages.push(now_date.toDateString());
            passages.push(now_date.toISOString());
            passages.push(now_date.toJSON());
            passages.push(now_date.toLocaleDateString());
            passages.push(now_date.toLocaleString());
            passages.push(now_date.toLocaleTimeString());
            passages.push(now_date.toString());
            passages.push(now_date.toTimeString());

            //var buff = document.createDocumentFragment();
            //passages.forEach(function (passage) {
            //    var p = document.createElement('p');
            //    p.classList.add('note-passage');
            //    p.textContent = passage;
            //    buff.appendChild(p);
            //});
            //document.getElementById("timezone_display").appendChild(buff);

        }
    };
    exports.Clock = Clock;
})(window);
