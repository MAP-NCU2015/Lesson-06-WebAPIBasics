var clock;
$(document).ready(function() {
	clock = new Clock();
	clock.setWrapper("clock_timezone", "clock_week", 
										"clock_year", "clock_month", "clock_date", 
										"clock_hour", "clock_minute", "clock_second");
	clock.start();
});
