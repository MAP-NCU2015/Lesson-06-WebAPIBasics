(function(window) {
    'use strict';

    function Model() {
        this.date = new Date(0);
    }

    Model.prototype.get_year = function() {
        return this.date.getFullYear();
    }

    Model.prototype.fillzero = function(size, number) {
        var str = '' + number;
        var length = str.length;
        if (size > length) {
            str = '0'.repeat(size - length) + str;
        }
        return str;
    }

    Model.prototype.get_month = function() {
        var month = this.date.getMonth() + 1;
        month = this.fillzero(2, month);
        return month;
    }

    Model.prototype.get_day = function() {
        var day = this.date.getDate();
        day = this.fillzero(2, day);
        return day;
    }

    Model.prototype.get_hour = function() {
        var hour = this.date.getHours();
        hour = this.fillzero(2, hour);
        return hour;
    }

    Model.prototype.get_minute = function() {
        var minute = this.date.getMinutes();
        minute = this.fillzero(2, minute);
        return minute;
    }

    Model.prototype.get_second = function() {
        var second = this.date.getSeconds();
        second = this.fillzero(2, second);
        return second;
    }

    Model.prototype.get_week = function() {
        var week = this.date.getDay();
        if (week === 1) {
            week = '星期一';
        } else if ( week === 2) {
            week = '星期二';
        } else if ( week === 3) {
            week = '星期三';
        } else if ( week === 4) {
            week = '星期四';
        } else if ( week === 5) {
            week = '星期五';
        } else if ( week === 6) {
            week = '星期六';
        } else if ( week === 7) {
            week = '星期日';
        }
        return week;
    }

    Model.prototype.get_timezone = function() {
        var offset = this.date.getTimezoneOffset();
        var hour = offset / 60;
        var minute = offset % 60;
        if (hour > 0) {
            hour = '-' + this.fillzero(2, hour);
        } else {
            hour = '+' + this.fillzero(2, -hour);
        }
        minute = this.fillzero(2, minute);
        var timezone = 'GMT ' + hour + minute;
        return timezone;
    }

    Model.prototype.get_current_time = function() {
        this.date = new Date();
        var time = this.get_year();
        time += '/' + this.get_month();
        time += '/' + this.get_day();
        time += ' ' + this.get_hour();
        time += ':' + this.get_minute();
        time += ':' + this.get_second();
        return time;
    }

    // Export to window
    window.Clock = window.Clock || {};
    window.Clock.Model = Model;
})(window);

