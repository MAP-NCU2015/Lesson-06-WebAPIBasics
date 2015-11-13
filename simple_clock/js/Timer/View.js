define(function() {
    'use strict';

    function View() {
        this.show = $('section.main #timer #show');
        this.minute = this.show.children('#minute').children('select');
        this.second = this.show.children('#second').children(' select');
    }

    View.prototype.fillzero = function(size, number) {
        var str = '' + number;
        var length = str.length;
        if (size > length) {
            str = '0'.repeat(size - length) + str;
        }
        return str;
    }

    View.prototype.init = function() {
        for (var i = 1; i < 60; i++) {
            this.minute.append('<option value="' + i +'"> ' + this.fillzero(2, i) + ' </option>');
            this.second.append('<option value="' + i +'"> ' + this.fillzero(2, i) + ' </option>');
        }
    }

    View.prototype.get_minute = function() {
        return this.minute.val();
    }

    View.prototype.get_second = function() {
        return this.second.val();
    }

    return View;
});

