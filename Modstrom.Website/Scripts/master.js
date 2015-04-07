
$(function () {
    modstrom.master.flexslider('.flexslider');
    modstrom.master.responsiveImage();
   
});

var modstrom = modstrom || {};

modstrom.master = modstrom.master || function () { 
    function flexslider(selector) {
        $(selector).flexslider({
            controlNav: false,
            directionNav: false
        });
    }
     
    //Responsive Images
    function responsiveImage() {
        [].forEach.call(document.querySelectorAll('.responsiveimg'), function (el) { 
            var w = el.offsetWidth;

            var element = el.getAttribute('data-imgsrc');
            var src = element.split('?')[0];
            var alt = el.getAttribute('data-imgalt');

            //Focal Point
            var focalPoint = element.substr(element.indexOf("center"))
            var testFocal = focalPoint.indexOf("&") 
            if (testFocal != -1) {
                focalPoint = focalPoint.substr(0, testFocal)
            }

            var wRnd = Math.round(w / 20) * 20;
            var hRnd = '0';

            if ($(el).hasClass('responsiveimg-slideshow')) {
                $(el).attr('style', 'background-image:url(' + src + '?' + focalPoint + '&width=' + wRnd + '&height=' + hRnd + '&mode=crop&quality=70&format=jpg);');
            } else {
                el.insertAdjacentHTML('afterbegin', '<img src="' + src + '?' + focalPoint + '&width=' + wRnd + '&height=' + hRnd + '&mode=crop&quality=70&format=jpg" width="' + w + '" alt="' + alt + '">');
            }
        });

    }


    return {
        flexslider: flexslider,
        responsiveImage: responsiveImage
    }
}();






