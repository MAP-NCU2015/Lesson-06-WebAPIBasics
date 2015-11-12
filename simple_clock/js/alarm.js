var AlarmManager = function( options = {} ) {
  this._minute  = document.getElementById( options.minute || 'alarm' );
  this._second  = document.getElementById( options.second || 'second' );
  this._start   = document.getElementById( options.start  || 'start' );
}

AlarmManager.prototype = {
  init() {
    this._start.addEventListener( 'click', ( this.start ).bind( this ) )
    navigator.mozSetMessageHandler( 'alarm', function() {
      new Notification( 'IT IS THE TIME' );
    } );
  },
  start() {
    var minutes = this._minute.value;
    var seconds = this._second.value;
    var time = moment().add( minutes, 'minutes' ).add( seconds, 'seconds' ).toDate();
    navigator.mozAlarms.add( time, 'ignoreTimezone' );
  }
}
