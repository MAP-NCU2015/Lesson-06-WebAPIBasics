var ms=0, s=0, m=0, start=0;
function timer(){
    if(start == 1)
    {
        ms = ms + 1;
        if(ms == 100)
        {
            s = s + 1;
            ms = 0;
        }
        if(s == 60)
        {
            m = m + 1;
            s = 0;
        }
    }

    setText('min1',m);
    setText('sec1',s);
    setText('msec',ms);
    
    //call every 0.01second
    setTimeout(timer, 10);

    //start
    document.getElementById("start").addEventListener('click', function (event) {
       start=1;
    });
    //pasue
    document.getElementById("pause").addEventListener('click', function (event) {
       start=0;
    });
    //reset
    document.getElementById("reset").addEventListener('click', function (event) {
       ms = 0;
       s = 0;
       m = 0;
       start = 0;
    });
};

function setText(id,val){
    if(val < 10){
        val = '0' + val;
    }
    document.getElementById(id).innerHTML = val;
};