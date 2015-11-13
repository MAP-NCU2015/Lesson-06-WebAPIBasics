/*Create clock object*/
var clock = new clock();
$(document).ready(function() {
  clock.startclock();
});

/*Creat stopwatch object*/
var stopwatch = new stopwatch();
$('#start').click(function() {
  stopwatch.startstopwatch();
});

$('#pause').click(function() {
  stopwatch.pause();
});

$('#reset').click(function() {
  stopwatch.reset();
});

/*Creat alarm object*/
var alarm = new alarm();
$('#alarm_start').click(function(){
  alarm.startAlarm();
});

$('#alarm_cancel').click(function(){
  alarm.cancelAlarm();
});