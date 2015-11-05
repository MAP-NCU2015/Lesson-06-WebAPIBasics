window.addEventListener("load", function() {
    console.log("Hello, this is a simple clock.");

    $('ul.tabs li').each(function(i) {
        $(this).click(function() {
            $(this).parent().children().removeClass('enable').eq(i).addClass('enable');
            $('section.main').children('div').hide().eq(i).show();
        });
    });

    (function() {
        var model;
        var view;

        model = new this.Clock.Model();
        view = new this.Clock.View();
        var clock = new this.Clock.Controller(model, view);
        clock.start();
    })();

    $('ul.tabs li').children().removeClass('enable').eq(1).addClass('enable');
    $('section.main').children('div').hide().eq(1).show();
});


