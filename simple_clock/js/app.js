window.Load_MVC = function(name) {
    $.when(
        $.getScript('js/' + name + '/Model.js'),
        $.getScript('js/' + name + '/View.js'),
        $.getScript('js/' + name + '/Controller.js'),
        $.Deferred(function( deferred ){
            $( deferred.resolve );
        })
    ).done(function() {
        var str = 'var model = new ' + name + '.Model();'
                + 'var view = new ' + name + '.View();'
                + 'var controller = new ' + name + '.Controller(model, view);'
                + 'controller.start();'
        eval(str);
    }).fail(function() {
        console.log(name + 'MVC loading fail. ');
    });
}

window.Tab_start = function() {
    $('ul.tabs li').each(function(i) {
        $(this).click(function() {
            $(this).parent().children().removeClass('enable').eq(i).addClass('enable');
            $('section.main').children('div').hide().eq(i).show();
        });
    });

    // set default tab
    var default_tab = 3;
    $('ul.tabs li').children().removeClass('enable').eq(default_tab).addClass('enable');
    $('section.main').children('div').hide().eq(default_tab).show();
}

window.addEventListener("load", function() {
    console.log("Hello, this is a simple clock.");

    Load_MVC('Clock');
    Load_MVC('Stopwatch');
    // Load_MVC('Timer');
    var model = new Timer.Model();
    var view = new Timer.View();
    var controller = new Timer.Controller(model, view);
    controller.start();
    // Load_MVC('Alarm');

    Tab_start();
});


