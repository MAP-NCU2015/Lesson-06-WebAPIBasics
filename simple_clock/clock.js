(function (exports) {

  var Clock = function () {
    this._time = null;
    this._wrapper = null;
    this._interval = null;
  }

  Clock.prototype = {

    handleEvent(event) {
      switch (event.type) {
        case 'focusOnClock':
          this.focusOnClock();
          break;
        case 'loseFocusOnClock':
          this.stopUpdate();
          break;
      }
    },

    initialize() {
      this._wrapper = document.querySelector('#main');
      window.addEventListener('focusOnClock', this);
      window.addEventListener('loseFocusOnClock', this);
    },

    updateClock() {
      this.updateTime();
      this.resetWrapper();
      this.drawClock();
    },

    focusOnClock() {
      this.updateClock();
      this._interval = window.setInterval((this.updateClock).bind(this), 100);
    },

    updateTime() {
      this._time = new Date();
    },

    resetWrapper(){
      this._wrapper.innerHTML = "";
    },

    drawClock() {
      var info = document.createElement('p');
      info.textContent = this._time;
      this._wrapper.appendChild(info);
    },

    stopUpdate() {
      window.clearInterval(this._interval);
    },

  }

  exports.Clock = Clock;

})(window);