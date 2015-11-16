function clock(){
    //calculate angle
    var d, h, m, s, timezone;
    d = new Date;
    
    //display time
    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    timezone = (d.getTimezoneOffset()/60)*(-1);
    setText('GMT', 'GMT+' + timezone);

    if(h >= 12){
        setText('suffix', 'PM');
    }else{
        setText('suffix', 'AM');
    }
    
    if(h != 12){
        h %= 12;
    }
    
    setText('sec', s);
    setText('min', m);
    setText('hr', h);
    
    //call every second
    setTimeout(clock, 1000);
};

function setText(id,val){
    if(val < 10){
        val = '0' + val;
    }
    document.getElementById(id).innerHTML = val;
};

