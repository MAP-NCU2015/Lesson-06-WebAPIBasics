'use strict';

(function (exports) {
    /**
     *
     *  @constructor
     *  @this {Countdown}
     */
    var second;
    var Countdown = function () {
        this.second = null;
        Notification.requestPermission();
    };
    Countdown.prototype = {
        /**
         * 
         * @this {Clock}
         */
        start() {
            navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
                var options = {
                    body: "remind : " + mozAlarm.data.minute + "minute(s): " + mozAlarm.data.second + "second(s) past",
                    icon: null
                }
                var n = new Notification('倒數計時', options);
                setTimeout(n.close.bind(n), (minute * 60 + second) * 1000);
                alert("remind : " + mozAlarm.data.minute + "minute(s): " + mozAlarm.data.second + "second(s) past");
            });
            window.addEventListener('click', this);
            for (var i = 0; i < 60; i++) {
                var op = document.createElement('option');
                op.textContent = i;
                op.value = i;
                document.getElementById('minute').appendChild(op);
            }
            for (var i = 0; i < 60; i++) {
                var op = document.createElement('option');
                op.textContent = i;
                op.value = i;
                document.getElementById('second').appendChild(op);
            }
        },
        handleEvent(event) {
            switch (event.type) {
                case 'click':
                    if (event.target.id == 'start') {
                        var now_date = new Date();
                        this.second = now_date.getSeconds();
                        this.start_timing();
                    }
                    break;
            }
        },
        start_timing() {
            var minute = document.getElementById('minute').selectedIndex;
            var second = document.getElementById('second').selectedIndex;



            // This the date to schedule the alarm
            var myDate = new Date();
            myDate.setSeconds(myDate.getSeconds() + second);
            myDate.setMinutes(myDate.getMinutes() + minute);

            // This is arbitrary data pass to the alarm
            var data = {
                minute: minute,
                second: second
            }

            var request = navigator.mozAlarms.add(myDate, "ignoreTimezone", data);

            request.onsuccess = function () {
                console.log("The alarm has been scheduled");
                //alert("倒數開始");
            };

            request.onerror = function () {
                console.log("An error occurred: " + this.error.name);
            };
        }
    };
    exports.Countdown = Countdown;
})(window);