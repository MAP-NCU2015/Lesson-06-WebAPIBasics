for (var i = 0; i < 60; i += 1){
    $('#alarm_minute').append('<option value="' + i + '">' + i + '</option>');
    $('#alarm_second').append('<option value="' + i + '">' + i + '</option>');
}
