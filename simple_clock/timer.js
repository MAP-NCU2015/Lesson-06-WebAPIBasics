'use strict';
(function(exports){

    var Timer = function(){
        this.mm='00';
        this.ss='00';
        this.cc='00';
        this.startbtn=null;
        this.stopbtn=null;
        this.now=0;
        this.startat=0;
        this.pauseat=0;
        this.interval=null;
    }
    Timer.prototype = {

        start(){
            this.startbtn=document.querySelector('#start');
            //this.pausebtn=document.querySelector('#pause');
            this.stopbtn=document.querySelector('#stop');
            this.startbtn.addEventListener('click',this);
            //this.pausebtn.addEventListener('click',this);
            this.stopbtn.addEventListener('click',this);
            this.drawTimeinit();
        },
        drawTimeinit(){
            var h2=document.querySelector('#h2');
            h2.innerHTML=this.mm+":"+this.ss+":"+this.cc;
        },
        drawTime(){
                this.getNow();
                var milli=this.now-this.startat+this.pauseat;
                this.mm=parseInt((milli/1000)/60%60);
                if(this.mm<10){
                    this.mm='0'+this.mm;
                }
                this.ss=parseInt(milli/1000%60);
                if(this.ss<10){
                    this.ss='0'+this.ss;
                }

                this.cc=parseInt(milli/10%100);
                if(this.cc<10){
                    this.cc='0'+this.cc;
                }
                var h2=document.querySelector('#h2');
                h2.innerHTML=this.mm+":"+this.ss+":"+this.cc;
        },
        changeBtn(){
            this.startbtn.id = this.startbtn.id=="start" ? "pause":"start";
            this.startbtn.innerHTML= this.startbtn.innerHTML=="start" ? "pause":"start";

        },
        handleEvent(event){
            switch(event.type){
                case 'click':
                    if(event.target.id === "start"){
                        this.timerStart();
                    }
                    else if (event.target.id === "pause"){
                        this.timerPause();
                    }
                    else if(event.target === this.stopbtn){
                        this.timerStop();
                    }
                    break;
            }
        },
        getNow(){
            this.now = (new Date()).getTime();
        },
        timerStart(){ 
            this.changeBtn();
            console.log("startat: "+this.startat);
            this.startat = (new Date()).getTime();
            this.interval=window.setInterval(this.drawTime.bind(this),10)
        },
        timerPause(){
            this.changeBtn();
            this.pauseat = this.pauseat+(new Date()).getTime()-this.startat;
            console.log("pauseat: "+this.pauseat);
            window.clearInterval(this.interval);
            //this.interval=null;
        },
        timerStop(){
            var h2=document.querySelector('#h2');
            this.mm='00';
            this.ss='00';
            this.cc='00';
            h2.innerHTML=this.mm+":"+this.ss+":"+this.cc;
            window.clearInterval(this.interval);
            this.startat=0;
            this.pauseat=0;
            this.startbtn.id="start";
            this.startbtn.innerHTML="start";
            //this.interval=null;
        }



    };
    exports.Timer=Timer;
})(window)
