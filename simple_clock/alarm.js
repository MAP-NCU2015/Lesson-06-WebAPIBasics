(function (exports) {

  var Alarm = function () {
    this._tHour = 0;
    this._tMinute = 0;
    this._tSecond = 0;
    this._timeout = null;
    this._on = false;
    this._wrapper = null;
  }

  Alarm.prototype = {

    handleEvent(event) {
      switch (event.type) {
        case 'focusOnAlarm':
          this.resetWrapper();
          this.drawAlarm();
          this.drawTime();
          break;
        case 'loseFocusOnAlarm':
          break;
      }
    },

    initialize() {
      this._wrapper = document.querySelector('#main');
      window.addEventListener('focusOnAlarm', this);
      window.addEventListener('loseFocusOnAlarm', this);
    },

    resetWrapper(){
      this._wrapper.innerHTML = '';
    },

    drawAlarm() {
      var buff = document.createDocumentFragment();
      var param = [['Hour', 0, 23], ['Minute', 0, 59], ['Second', 0, 59]];
      param.forEach((function (element) {
        var input = document.createElement('input');
        var label = document.createElement('span');
        input.id = element[0].toLowerCase();
        input.setAttribute('type', 'number');
        input.min = element[1];
        input.max = element[2];
        input.onchange = (function () {
          input.value = Math.max(input.min, Math.min(input.max, input.value));
          this.updateTime();
          this.setAlarm();
        }).bind(this);
        label.innerHTML = element[0] + ':';
        buff.appendChild(label);
        buff.appendChild(input);
      }).bind(this));
      var button = document.createElement('input');
      button.id = 'hint';
      button.setAttribute('type', 'button');
      button.value = 'Off';
      button.onclick = (function () {
        this.switchAlarm();
      }).bind(this);
      buff.appendChild(button);
      this._wrapper.appendChild(buff);
    },

    drawTime(){
      document.querySelector('#hour').value = this._tHour;
      document.querySelector('#minute').value = this._tMinute;
      document.querySelector('#second').value = this._tSecond;
    },

    updateTime() {
      this._tHour = document.querySelector('#hour').value;
      this._tMinute = document.querySelector('#minute').value;
      this._tSecond = document.querySelector('#second').value;
    },

    switchAlarm() {
      var button = document.querySelector('#hint');
      if (this._on) {
        this._on = false;
        button.value = 'Off';
        window.clearTimeout(this._timeout);
      }
      else {
        this.setAlarm();
        this._on = true;
        button.value = 'On';
      }
    },

    setAlarm() {
      window.clearTimeout(this._timeout);
      var isTomorrow = false;
      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      var tHour = document.querySelector('#hour').value;
      var tMinute = document.querySelector('#minute').value;
      var tSecond = document.querySelector('#second').value;
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();
      if (tHour < hour)
        isTomorrow = true;
      else if (tHour == hour && tMinute < minute)
        isTomorrow = true;
      else if (tHour == hour && tMinute == minute && tSecond < second)
        isTomorrow = true;
      if (isTomorrow)
        day += 1;
      var targetTime = (new Date(year, month, day, tHour, tMinute, tSecond, now.getMilliseconds())) - (new Date());
      if (this._on)
        this.switchAlarm();
      this._timeout = window.setTimeout(this.fireAlarm.bind(this), parseInt(targetTime));
    },

    fireAlarm() {
      alert('Alarm warning');
    }

  }

  exports.Alarm = Alarm;

})(window);