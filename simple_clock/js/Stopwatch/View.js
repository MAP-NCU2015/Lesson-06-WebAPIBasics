(function(window) {
    'use strict';

    function View() {
        this.show = $('section.main #stopwatch #show');
    }

    View.prototype.update_minute = function(minute) {
        this.show.children('#minute').html(minute);
    }

    View.prototype.update_second = function(second) {
        this.show.children('#second').html(second);
    }

    View.prototype.update_milli = function(milli) {
        this.show.children('#milli').html(milli);
    }
    
    View.prototype.update = function(minute, second, milli) {
        this.update_minute(minute);
        this.update_second(second);
        this.update_milli(milli);
    }

    // Export to window
    window.Stopwatch = window.Stopwatch || {};
    window.Stopwatch.View = View;
})(window);

