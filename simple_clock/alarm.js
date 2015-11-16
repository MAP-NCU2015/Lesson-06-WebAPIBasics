var hour = -1, minute = -1;
function alarm(){

    var d = new Date;
    if(hour==d.getHours() && minute==d.getMinutes())
    {
        window.alert("Wake up.");
        hour = -1;
        minute = -1;
    }

    setInterval(alarm,1000);

    //set alarm
    document.getElementById("alarmbutton").addEventListener('click', function (event) {   
        hour = document.getElementById('alarm_hour').value;
        minute = document.getElementById('alarm_minute').value;
    });
};