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
            var day;
            switch(today.getDay()){
                case 1:
                    day="Monday";
                    break;
                case 2:
                    day="Tuesday";
                    break;
                case 3:
                    day="Wednesday";
                    break;
                case 4:
                    day="Thursday"
                    break;
                case 5:
                    day="Friday";
                    break;
                case 6:
                    day="Saturday";
                    break;
                case 0:
                    day="Sunday";
                    break;
                    
            }
            var textContent=today.getFullYear()+"/"+today.getMonth()+
            "/"+today.getDate()+"<br/>"+today.getHours()+":"+today.getMinutes()+
            ":"+today.getSeconds()+"<br/>"+""+day+"<br/>"+"UTC "+today.getTimezoneOffset()/-60;
            
            h1.innerHTML = textContent;
            
        }    
    };
    exports.TimeDisplay=TimeDisplay;
})(window);
