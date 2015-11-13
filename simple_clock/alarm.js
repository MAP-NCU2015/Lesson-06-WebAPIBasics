'use strict';
(function(exports){
    var Alarm = function(){
        this.setbtn=null;
        this.minute=0;
        this.second=0;
    }
    Alarm.prototype={

        start(){
            this.setOption();
            this.setbtn=document.getElementById("set");
            this.setbtn.addEventListener('click',this);
            navigator.mozSetMessageHandler("alarm", function (mozAlarm) { 
                new Notification("Ring Ring Ring"); 
            });
        },
        setOption(){
            var mindraw=document.getElementById("minute");
            var seconddraw=document.getElementById("second");
            for( var i=0 ; i<60;i++){
                var opt = document.createElement('option');
                opt.value=i;
                opt.innerHTML=i;
                mindraw.appendChild(opt);
            }
            for( var i=0 ; i<60;i++){
                var opt = document.createElement('option');
                opt.value=i;
                opt.innerHTML=i;
                seconddraw.appendChild(opt);
            }


        },
        handleEvent(event){
            switch(event.type){
                case 'click':
                    var mindraw=document.getElementById("minute");
                    var seconddraw=document.getElementById("second");
                    this.minute= mindraw.options[mindraw.selectedIndex].value;
                    this.second = seconddraw.options[seconddraw.selectedIndex].value;
                    var alarmdate=(new Date()).getTime();
                    alarmdate+=this.second*1000 + this.minute*60*1000;
                    var date=(new Date()).setTime(alarmdate);
                    var alarm = navigator.mozAlarms.add(date, 'ignoreTimezone');
                    break;
            }
        }


    };

    exports.Alarm = Alarm;
})(window)
