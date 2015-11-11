window.addEventListener("load", function() {
  var clockManager = new ClockManager();
  clockManager.start();
  var stopWatchManager = new StopWatchManager( {
    time:  'stopwatch-time',
    start: 'stopwatch-start',
    pause: 'stopwatch-pause',
    reset: 'stopwatch-reset'
  } );
  stopWatchManager.init();
});
