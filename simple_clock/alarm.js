(function (exports) {

  var Alarm = function () {
    this._tMinute = 0;
    this._tSecond = 0;
    this._alarmId = null;
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
      navigator.mozSetMessageHandler("alarm", this.alarmTrigger.bind(this));
    },

    resetWrapper() {
      this._wrapper.innerHTML = '';
    },

    drawAlarm() {
      var buff = document.createDocumentFragment();
      var param = [['Minute', 0, 59], ['Second', 0, 59]];
      param.forEach((function (element) {
        var input = document.createElement('input');
        var label = document.createElement('span');
        var br = document.createElement('br');
        label.innerHTML = element[0] + ':';
        input.id = element[0].toLowerCase();
        input.setAttribute('type', 'number');
        input.min = element[1];
        input.max = element[2];
        input.onchange = (function () {
          input.value = Math.max(input.min, Math.min(input.max, input.value));
          this.updateTime();
          this.setAlarm();
        }).bind(this);
        buff.appendChild(label);
        buff.appendChild(input);
        buff.appendChild(br);
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

    drawTime() {
      document.querySelector('#minute').value = this._tMinute;
      document.querySelector('#second').value = this._tSecond;
    },

    updateTime() {
      this._tMinute = document.querySelector('#minute').value;
      this._tSecond = document.querySelector('#second').value;
    },

    switchAlarm() {
      var button = document.querySelector('#hint');
      if (this._on) {
        this._on = false;
        button.value = 'Off';
        this.stopAlarm();
      }
      else {
        this._on = true;
        button.value = 'On';
        this.setAlarm();
      }
    },

    setAlarm() {
      this.stopAlarm();

      var now = new Date();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      var tMinute = parseInt(document.querySelector('#minute').value);
      var tSecond = parseInt(document.querySelector('#second').value);
      var year = now.getFullYear();
      var month = now.getMonth();
      var day = now.getDate();

      var targetTime = new Date(year, month, day, hour, minute + tMinute, second + tSecond, now.getMilliseconds());

      if (!this._on)
        return;

      var req = navigator.mozAlarms.add(targetTime, "honorTimezone");
      req.onsuccess = (function () {
        this._alarmId = req.result;
      }).bind(this);
    },

    stopAlarm() {
      navigator.mozAlarms.remove(this._alarmId);
    },

    alarmTrigger() {
      var options = {
        body: "Alarm Time Up"
      }
      this.switchAlarm();
      var notification = new Notification("Alarm", options);
      setTimeout(notification.close.bind(notification), 3000);
    }

  }

  exports.Alarm = Alarm;

})(window);