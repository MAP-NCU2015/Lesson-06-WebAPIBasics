(function(window) {
    'use strict';

    function View() {
        this.show = $('section.main #Alarm #show');
    }

    // Export to window
    window.Alarm = window.Alarm || {};
    window.Alarm.View = View;
})(window);

