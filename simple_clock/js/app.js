window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  //var translate = navigator.mozL10n.get;
  navigator.mozL10n.once(startTictac);
  var clock = new clock();
  clock.startTictac();
});

