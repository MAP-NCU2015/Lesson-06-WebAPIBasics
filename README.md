# Lesson-06-WebAPIBasics

Please see the [slide](https://map-ncu2015.github.io/Lesson-06-WebAPIBasics/).

## Assignment

Please write a simple clock application, which has the following features.

1. (30%) Display current time in **YYYY/MM/dd hh:mm:ss** format (e.g.: 2015/11/02 19:02:29), and update it every second.
    1. (+5%) Display week.
    2. (+5%) Display timezone.
2. (30%) Stopwatch that displays in **mm:ss.cc** (e.g.: 00:00.00). Users can click buttons to **start**, **pause** and **reset** the stopwatch.
    * **start**: Starts the timer, increases the timer every 1/100 second.
    * **pause**: Pauses the timer, the timer can be resumed by **start**.
    * **reset**: Resets the timer to zero.
3. (40%) Users can schedule an alarm that will trigger in future (at most 59min 59sec).
    * **NOTE**: Your application should be able to notify users even if they closed the application.

### Turn In

1. Fork this repository.
2. Modify files in `simple_clock` directory.
3. Create a pull request that have your student ID in the title.

### Hints

1. You can use [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to get the desired time.
2. You can use [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) to periodically do something.
3. You can use [Alarm API](https://developer.mozilla.org/en-US/docs/Web/API/Alarm_API) to schedule messages to system.
4. You can use [Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API) to send system-level notifications.

## Examples

Some examples were borrowed from somewhere.

### Simple Telnet Client

Cloned from https://github.com/soapdog/firefoxos-sample-app-telnet-client .

### Bouncing Ball

Copied from https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation .

### Todo List

Cloned from https://github.com/mdn/to-do-notifications/tree/gh-pages .

### Emogotchi

Cloned from https://github.com/mdn/emogotchi .
