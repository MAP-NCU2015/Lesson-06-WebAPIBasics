define(function() {
    'use strict';

    function Model() {
        this.time = 0;
    }

    Model.prototype.set_time = function(minute, second) {
        this.time = minute*60 + second;
    }

    Model.prototype.get_time = function() {
        return this.time;
    }

    return Model;
});

