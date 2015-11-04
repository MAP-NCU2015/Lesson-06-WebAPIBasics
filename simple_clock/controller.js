(function (exports) {

  var Controller = function () {
    this._clock = new Clock();
    this._stopWatch = new StopWatch();
    this._alarm = new Alarm();
  }

  Controller.prototype = {

    handleEvent(event) {
      switch (event.type) {
        case 'changeMode':
          this.changeMode(event.detail);
          break;
      }
    },

    initialize() {
      this._clock.initialize();
      this._stopWatch.initialize();
      this._alarm.initialize();
      window.addEventListener('changeMode', this);
    },

    changeMode(type) {
      switch (type) {
        case "clock":
          window.dispatchEvent(new CustomEvent('focusOnClock', {}));
          window.dispatchEvent(new CustomEvent('loseFocusOnStopWatch', {}));
          window.dispatchEvent(new CustomEvent('loseFocusOnAlarm', {}));
          break;
        case "stopWatch":
          window.dispatchEvent(new CustomEvent('loseFocusOnClock', {}));
          window.dispatchEvent(new CustomEvent('focusOnStopWatch', {}));
          window.dispatchEvent(new CustomEvent('loseFocusOnAlarm', {}));
          break;
        case "alarm":
          window.dispatchEvent(new CustomEvent('loseFocusOnClock', {}));
          window.dispatchEvent(new CustomEvent('loseFocusOnStopWatch', {}));
          window.dispatchEvent(new CustomEvent('focusOnAlarm', {}));
          break;
      }
    }

  }

  exports.Controller = Controller;

})(window);