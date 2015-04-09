
$(function () {

    novicell.responsive.breakpoints({
        0:      'default mobile',
        480:    'default mobile',
        768:    'default desktop tablet',
        980:    'default desktop',
        1185:   'default desktop'
    });

    novicell.responsive.init(modstrom.master.resetUI());
    modstrom.master.flexslider('.flexslider');  
    modstrom.master.mainNavigation();

    modstrom.master.responsiveImage('default');
    modstrom.master.responsiveImage('mobile');
    modstrom.master.responsiveImage('desktop');
});

$(window).resize(function () {
    modstrom.master.responsiveImage('default');
    modstrom.master.responsiveImage('mobile');
    modstrom.master.responsiveImage('desktop');

    $('#nav-container').perfectScrollbar('update');
});

var modstrom = modstrom || {};

modstrom.master = modstrom.master || function () {
    function resetUI() {}

    function mainNavigation() {
        var container = '#nav-container';
        var nav = '#nav-header';
        var navWidth = $(nav).outerWidth();
        var childWidth = 0;

        $('li', nav).each(function () {
            childWidth += $(this).outerWidth();
        });

        $(nav).width(childWidth);

        $('#nav-container').perfectScrollbar({
            maxScrollbarLength: 250
        });
    }

    function flexslider(selector) {
        $(selector).flexslider({
            controlNav: false,
            directionNav: false
        });
    }
     
    //Responsive Images
    function responsiveImage(breakpoint) {
        if($('body').hasClass(breakpoint)) {
            [].forEach.call(document.querySelectorAll('.responsiveimg-' + breakpoint), function (el) { 
                var w = el.offsetWidth;
                var element = el.getAttribute('data-imgsrc-' + breakpoint);
                var src = element.split('?')[0];
                var alt = el.getAttribute('data-imgalt-' + breakpoint);
                var focalPoint = element.substr(element.indexOf("center"))
                var testFocal = focalPoint.indexOf("&")

                if (testFocal != -1) {
                    focalPoint = focalPoint.substr(0, testFocal)
                }

                var wRnd = Math.round(w / 20) * 20;
                var hRnd = '0';

                if ($(el).hasClass('responsiveimg-background-' + breakpoint)) {
                    $(el).attr('style', 'background-image:url(' + src + '?' + focalPoint + '&width=' + wRnd + '&height=' + hRnd + '&mode=crop&quality=70&format=jpg);');
                } else {
                    el.insertAdjacentHTML('afterbegin', '<img src="' + src + '?' + focalPoint + '&width=' + wRnd + '&height=' + hRnd + '&mode=crop&quality=70&format=jpg" width="' + w + '" alt="' + alt + '">');
                }

                $(el).removeAttr('data-imgsrc-' + breakpoint);
                $(el).removeAttr('data-imgalt-' + breakpoint);
                $(el).removeClass('responsiveimg-' + breakpoint);
                $(el).removeClass('responsiveimg-background-' + breakpoint);
            });
        }
    }


    return {
        resetUI: resetUI,
        mainNavigation: mainNavigation,
        flexslider: flexslider,
        responsiveImage: responsiveImage
    }
}();






