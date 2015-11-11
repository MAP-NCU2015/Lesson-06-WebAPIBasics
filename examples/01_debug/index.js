(function () {
  'use strict';

  function main () {
    var btn = document.querySelector('#start-btn');
    var box = document.querySelector('#out-box');

    btn.addEventListener('click', function () {
      var i = 0;
      asyncWhile(function () {
        return i < 5;
      }, function () {
        printToBox(box, 'i = ' + i);
        ++i;
        return wait(1000);
      }).then(function () {
        printToBox(box, 'done');
      });
    });
  }

  function asyncWhile (next, fn) {
    if (!next()) {
      return Promise.resolve();
    }
    return fn().then(asyncWhile.bind(this, next, fn));
  }

  function printToBox (container, message) {
    var p = document.createElement('p');
    p.textContent = message;
    container.appendChild(p);
  }

  function wait (msDelay) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, msDelay);
    });
  }

  main();

})();
