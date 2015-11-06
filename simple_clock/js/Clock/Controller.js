(function(window) {
    'use strict';

    function Controller(model, view) {
        this.model = model;
        this.view = view;
        this.task = null;
    }

    Controller.prototype.start = function() {
        this.task = setInterval(function() {
            var current_time = this.model.get_current_time();
            var week = this.model.get_week();
            var timezone = this.model.get_timezone();
            this.view.update(current_time, week, timezone);
        }.bind(this), 100);
    }

    // Export to window
    window.Clock = window.Clock || {};
    window.Clock.Controller = Controller;
})(window);

