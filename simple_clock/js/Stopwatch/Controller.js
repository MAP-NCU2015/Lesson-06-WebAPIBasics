(function(window) {
    'use strict';

    function Controller(model, view) {
        this.model = model;
        this.view = view;
        this.task = null;
    }

    Controller.prototype.start = function() {
        this.task = setInterval(function() {
        }.bind(this), 100);
        clearInterval(this.task);
    }

    // Export to window
    window.Stopwatch = window.Stopwatch || {};
    window.Stopwatch.Controller = Controller;
})(window);

