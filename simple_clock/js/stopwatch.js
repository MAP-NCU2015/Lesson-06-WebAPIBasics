var StopWatchManager = function( options = {} ) {
  this._time  = document.getElementById( options.time  || 'time' );
  this._start = document.getElementById( options.start || 'start' );
  this._pause = document.getElementById( options.pause || 'pause' );
  this._reset = document.getElementById( options.reset || 'reset' );
  this._counter = 0;
};

function pad( n, width, z ) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array( width - n.length + 1 ).join( z ) + n;
}

StopWatchManager.prototype = {
  init() {
    this._start.addEventListener( 'click', ( this.start ).bind( this ) );
    this._pause.addEventListener( 'click', ( this.pause ).bind( this ) );
    this._reset.addEventListener( 'click', ( this.reset ).bind( this ) );
  },
  start() {
    if( !this._tick ) {
        this._tick = window.setInterval( ( function() {
          this._counter ++;
          var minute = pad( Math.floor( this._counter / 6000 ) % 60, 2 );
          var second = pad( Math.floor( this._counter / 100 ) % 60, 2 );
          var millis = pad( Math.floor( this._counter )  % 100, 2 );
          this._time.innerHTML =  minute + ":" + second + ":" + millis;
        } ).bind(this), 10 )
    }
  },
  pause() {
    if( this._tick ) {
      clearInterval( this._tick );
      this._tick = null;
    }
  },
  reset() {
    if( !this._tick ) {
      this._counter = 0;
      this._time.innerHTML = "00:00:00";
    }
  }
}
