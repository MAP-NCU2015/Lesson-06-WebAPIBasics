define(function() {
    'use strict';

    function View() {
        this.show = $('section.main #clock #show');
    }

    View.prototype.update_current_time = function(current_time) {
        var where = this.show.children('#current_time');
        where.html(current_time);
    }

    View.prototype.update_week = function(week) {
        var where = this.show.children('#week');
        where.html(week);
    }

    View.prototype.update_timezone = function(timezone) {
        var where = this.show.children('#timezone');
        where.html(timezone);
    }

    View.prototype.update = function(current_time, week, timezone) {
        this.update_current_time(current_time);
        this.update_week(week);
        this.update_timezone(timezone);
    }

    return View;
});

