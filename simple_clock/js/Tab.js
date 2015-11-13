define(function() {

    var Tab = function() {
    }

    Tab.start = function() {
        $('ul.tabs li').each(function(i) {
            $(this).click(function() {
                $(this).parent().children().removeClass('enable').eq(i).addClass('enable');
                $('section.main').children('div').hide().eq(i).show();
            });
        });
    }

    Tab.set_tab = function(id) {
        $('ul.tabs li').removeClass('enable').eq(id).addClass('enable');
        $('section.main').children('div').hide().eq(id).show();
    }


    return Tab;
});
