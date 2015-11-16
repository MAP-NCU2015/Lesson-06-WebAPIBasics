function calendar(){
    var day=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var month=['January','February','March','April','May','June','July','August','September','October','November','December'];
    d = new Date;
    setText('day',day[d.getDay()]);
    setText('date',d.getDate());
    setText('month-year',(1900+d.getYear())+' '+month[d.getMonth()]);
};

function setText(id,val){
    if(val < 10){
        val = '0' + val;
    }
    document.getElementById(id).innerHTML = val;
};

