define(function() {
    'use strict';

    function Controller(model, view) {
        this.model = model;
        this.view = view;
        this.task = null;
    }

    Controller.prototype.start = function() {
        this.view.init();
        this.bind();
    }

    Controller.prototype.timeout = function() {
        var str = 'Your task is timeout !';
        if(!("Notification" in window)) {
            alert(str);
        }
        else if (Notification.permission === "granted") {
            var notification = new Notification(str);
        }
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    var notification = new Notification(str);
                }
            });
        }

    }

    Controller.prototype.add_timer = function() {
        var minute = this.view.get_minute();
        var second = this.view.get_second();
        this.model.set_time(minute, second);

        var time = this.model.get_time();
        setTimeout(this.timeout.bind(this), time*1000);
    }

    Controller.prototype.bind = function() {
        var button = $('section.main #timer #start');
        button.click(this.add_timer.bind(this));
    }

    return Controller;
});

