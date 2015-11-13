window.LoadMVC = function(path) {
    var Model = path + '/Model';
    var View = path + '/View';
    var Controller = path + '/Controller';
    define([Model, View, Controller], function(Model, View, Controller) {
        var model = new Model();
        var view = new View();
        var controller = new Controller(model, view);

        return controller;
    });
}

require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.4.min',
        Tab: 'Tab',
        Clock_main: 'Clock/main',
        Stopwatch_main: 'Stopwatch/main',
        Timer_main: 'Timer/main',
        Install: 'Install'
    }
});

require(['jquery'], function($) {
    console.log("Hello, this is a simple clock.");
    require(['Tab', 'Install'], function(Tab, Install) {
        Tab.start();
        Tab.set_tab(0);
        Install.start();
        require(['Clock_main', 'Stopwatch_main', 'Timer_main'], function(Clock, Stopwatch, Timer) {
            Clock.start();
            Stopwatch.start();
            Timer.start();
        });
    });
});

