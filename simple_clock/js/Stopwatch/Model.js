define(function() {
    'use strict';

    function Model() {
        this.time = 0;
    }

    Model.prototype.fillzero = function(size, number) {
        var str = '' + number;
        var length = str.length;
        if (size > length) {
            str = '0'.repeat(size - length) + str;
        }
        return str;
    }

    Model.prototype.update_time = function(delta) {
        this.time += delta;
    }

    Model.prototype.reset_time = function() {
        this.time = 0;
    }

    Model.prototype.get_minute = function() {
        var minute = this.time / 1000 / 60;
        minute = parseInt(minute);
        minute = this.fillzero(2, minute);
        return minute;
    }

    Model.prototype.get_second = function() {
        var second = this.time / 1000 % 60;
        second = parseInt(second);
        second = this.fillzero(2, second);
        return second;
    }

    Model.prototype.get_milli = function() {
        var milli = this.time % 1000 / 10;
        milli = parseInt(milli);
        milli = this.fillzero(2, milli);
        return milli;
    }

    return Model;
});

