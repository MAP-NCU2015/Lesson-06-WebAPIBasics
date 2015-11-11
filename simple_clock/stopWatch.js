(function (exports) {

  var StopWatch = function () {
    this._startAt = 0;
    this._lapTime = 0;
    this._time = null;
    this._wrapper = null;
    this._interval = null;
    this._focus = false;
  }

  StopWatch.prototype = {

    handleEvent(event) {
      switch (event.type) {
        case 'changeStopWatchState':
          this.changeState(event.detail);
          break;
        case 'focusOnStopWatch':
          this._focus = true;
          this.resetWrapper();
          this.drawStopWatch();
          this.updateTime()
              .then(this.drawTime.bind(this));
          break;
        case 'loseFocusOnStopWatch':
          this._focus = false;
          break;
      }
    },

    initialize() {
      this._wrapper = document.querySelector('#main');
      window.addEventListener('changeStopWatchState', this);
      window.addEventListener('focusOnStopWatch', this);
      window.addEventListener('loseFocusOnStopWatch', this);
    },

    focusOnStopWatch(){
      this._wrapper = document.querySelector('#main');
    },

    getDuration(){
      return this._lapTime + (this._startAt ? this.now() - this._startAt : 0);
    },

    padding(num, size){
      var str = "0000" + num;
      return str.substr(str.length - size);
    },

    updateTime() {
      return new Promise((function (resolve, reject) {
        var h = m = s = ms = 0;
        var newTime = '';
        var time = this.getDuration();
        h = Math.floor(time / (60 * 60 * 1000));
        time = time % (60 * 60 * 1000);
        m = Math.floor(time / (60 * 1000));
        time = time % (60 * 1000);
        s = Math.floor(time / 1000);
        ms = time % 1000;
        newTime = this.padding(h, 2) + ':' + this.padding(m, 2) + ':' + this.padding(s, 2) + ':' + this.padding(ms, 3);
        this._time = newTime;
        if (this._focus)
          resolve();
      }).bind(this));
    },

    resetWrapper() {
      this._wrapper.innerHTML = "";
    },

    drawTime() {
      var timer = document.querySelector('#time');
      timer.innerHTML = this._time;
    },

    drawStopWatch() {
      var buff = document.createDocumentFragment();
      var div = document.createElement('div');
      var timer = document.createElement('h2');
      var actions = ['start', 'stop', 'reset'];

      timer.id = 'time';
      div.appendChild(timer);
      buff.appendChild(div);

      actions.forEach(function (element) {
        var button = document.createElement('input');
        button.setAttribute('type', 'button');
        button.setAttribute('value', element);
        button.className = 'myButton';
        button.onclick = function () {
          window.dispatchEvent(new CustomEvent('changeStopWatchState', { detail: element }));
        };
        buff.appendChild(button);
      });

      this._wrapper.appendChild(buff);
    },

    now() {
      return (new Date()).getTime();
    },

    start(){
      this._interval = window.setInterval((function () {
        this.updateTime()
            .then(this.drawTime.bind(this));
      }).bind(this), 1);
      this._startAt = this._startAt ? this._startAt : this.now();
    },

    stop(){
      this._lapTime = this._startAt ? this._lapTime + this.now() - this._startAt : this._lapTime;
      this._startAt = 0;
      window.clearInterval(this._interval);
    },

    reset(){
      this.stop();
      this._startAt = 0;
      this._lapTime = 0;
      this.updateTime()
          .then(this.drawTime.bind(this));
    },

    changeState(state) {
      switch (state) {
        case "start":
          this.start();
          break;
        case "stop":
          this.stop();
          break;
        case "reset":
          this.reset();
          break;
      }
    }

  }

  exports.StopWatch = StopWatch;

})(window);