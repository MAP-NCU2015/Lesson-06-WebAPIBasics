'use strict';

(function(exports) {

    var TimeDisplay = function(){
        
    }
    TimeDisplay.prototype = {

        start(){
            setInterval(this.showTime.bind(this),1000);
        },
        showTime(){
            var today = new Date();
            var h1 = document.querySelector('#h1');
            //h.textContent='';
            //h.textContent=today.getFullYear()+" "+today.getMonth()+
            //" "+today.getDate()+" "+today.getHour()+" "+today.getMinute()+
            //" "+today.getSecond();
            var textContent=today;
            h1.innerHTML = "";
            h1.innerHTML = textContent;
            
        }    
    };
    exports.TimeDisplay=TimeDisplay;
})(window);
