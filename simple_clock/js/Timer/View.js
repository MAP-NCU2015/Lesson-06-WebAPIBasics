(function(window) {
    'use strict';

    function View() {
        this.show = $('section.main #timer #show');
    }

    // Export to window
    window.Timer = window.Timer || {};
    window.Timer.View = View;
})(window);

