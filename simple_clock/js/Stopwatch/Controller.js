(function(window) {
    'use strict';

    function Controller(model, view) {
        this.model = model;
        this.view = view;
        this.task = null;
    }

    Controller.prototype.bind_start = function() {
        var start_button = $('section.main #stopwatch #start');
        start_button.click(function() {
            this.start_watch();
        }.bind(this));
    }

    Controller.prototype.bind_stop = function() {
        var stop_button = $('section.main #stopwatch #stop');
        stop_button.click(function() {
            this.stop_watch();
        }.bind(this));
    }

    Controller.prototype.bind_reset = function() {
        var reset_button = $('section.main #stopwatch #reset');
        reset_button.click(function() {
            this.reset_watch();
        }.bind(this));
    }

    Controller.prototype.start_watch = function() {
        this.task = setInterval(function() {
            this.model.update_time(10);
            var minute = this.model.get_minute();
            var second = this.model.get_second();
            var milli = this.model.get_milli();
            this.view.update(minute, second, milli);
        }.bind(this), 10);
    }

    Controller.prototype.stop_watch = function() {
        clearInterval(this.task);
    }

    Controller.prototype.reset_watch = function() {
        clearInterval(this.task);
        this.model.reset_time();
        var minute = this.model.get_minute();
        var second = this.model.get_second();
        var milli = this.model.get_milli();
        this.view.update(minute, second, milli);
    }

    Controller.prototype.start = function() {
        this.bind_start();
        this.bind_stop();
        this.bind_reset();
    }

    // Export to window
    window.Stopwatch = window.Stopwatch || {};
    window.Stopwatch.Controller = Controller;
})(window);

