var clock, stopwatch, alarm;
$(document).ready(function() {
	clock = new Clock();
	clock.setWrapper("clock_timezone", "clock_week", 
										"clock_year", "clock_month", "clock_date", 
										"clock_hour", "clock_minute", "clock_second");
	clock.start();

	stopwatch = new Stopwatch();
	stopwatch.setWrapper("stop_minute", "stop_second", "stop_msecond");
	stopwatch.setTrigger("stop_start", "stop_pause",
												"stop_resume", "stop_reset");

	alarm = new Alarm();
	alarm.setTrigger("alarm_start");
	alarm.setField("alarm_minute", "alarm_second");
});
