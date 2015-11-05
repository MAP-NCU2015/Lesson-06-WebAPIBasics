(function(window) {
    'use strict';

    function View() {
        this.show = $('section.main #stopwatch #show');
    }

    View.prototype.update = function() {
    }

    // Export to window
    window.Stopwatch = window.Stopwatch || {};
    window.Stopwatch.View = View;
})(window);

