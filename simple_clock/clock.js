(function (exports) {

  var Clock = function () {
    this._wrapper = null;
    this._interval = null;
  }

  Clock.prototype = {

    handleEvent(event) {
      switch (event.type) {
        case 'focusOnClock':
          this.resetWrapper();
          this.drawClock();
          this.drawTime();
          this.stopUpdate();
          this._interval = window.setInterval((this.drawTime).bind(this), 100);
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

    weekParser(week){
      switch (week) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
      }
    },

    drawTime() {
      var date = new Date();
      var yyyy = date.getFullYear().toString();
      var MM = (date.getMonth() + 1).toString();
      var dd = date.getDate().toString();
      var hh = date.getHours().toString();
      var mm = date.getMinutes().toString();
      var ss = date.getSeconds().toString();
      document.querySelector('#time').innerHTML = yyyy + "/" + MM + "/" + dd + " " + hh + ":" + mm + ":" + ss;
      document.querySelector('#week').innerHTML = this.weekParser(date.getDay());
      document.querySelector('#timezone').innerHTML = date.getTimezoneOffset() + " diff between UTC and local.";

    },

    resetWrapper(){
      this._wrapper.innerHTML = "";
    },

    drawClock() {
      var buff = document.createDocumentFragment();
      var texts = [["Current Time", 'time'], ["Current Week", 'week'], ["Timezone", 'timezone']];
      texts.forEach(function (element) {
        var header = document.createElement('h2');
        var content = document.createElement('span');
        header.innerHTML = element[0];
        content.id = element[1];
        buff.appendChild(header);
        buff.appendChild(content);
      });
      this._wrapper.appendChild(buff);
    },

    stopUpdate() {
      window.clearInterval(this._interval);
    },

  }

  exports.Clock = Clock;

})(window);