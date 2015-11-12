var ClockManager = function( options = {} ) {
  this._date     = document.getElementById( options.date || 'date' );
  this._week     = document.getElementById( options.week || 'week' );
  this._timezone = document.getElementById( options.timezone || 'timezone' );
}

ClockManager.prototype = {
  start() {
    window.setInterval( ( function() {
      this._date.innerHTML     = moment().format('YYYY/MM/DD hh:mm:ss');
      this._week.innerHTML     = moment().format('dddd');
      this._timezone.innerHTML = moment().format('Z');
    } ).bind(this), 450 ) 
  }
}
