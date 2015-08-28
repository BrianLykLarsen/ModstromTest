
$(function () {

    novicell.responsive.breakpoints({
        0:      'default mobile',
        480:    'default mobile',
        768:    'default tablet',
        980:    'default desktop',
        1185:   'default desktop'
    });

    novicell.responsive.init();
    modstrom.master.flexslider('.flexslider');
    modstrom.master.productSlider();
    modstrom.master.commentsSlider();
    modstrom.master.testimonialSlider('.testimonials-slider');
    modstrom.master.testimonialSlider('.testimonials-slider-mobile');
    modstrom.master.mainNavigation();
    modstrom.master.adjustTrigger();
    modstrom.master.questionTrigger();
    modstrom.master.formContact();
    modstrom.master.newsPaging('.news-list');
    modstrom.master.testimonialOverlay();
    modstrom.master.toggleSearch();
    modstrom.master.scrollTo();
    modstrom.master.hideUploadButtom();
    modstrom.master.support();
    modstrom.master.showMoreCases();
    modstrom.master.toggleTestimonial();
    modstrom.master.formFix();
    modstrom.master.backToTop();
    modstrom.master.responsiveImage('default');
    modstrom.master.responsiveImage('mobile');
    modstrom.master.responsiveImage('tablet');
    modstrom.master.responsiveImage('desktop');

    

	/** COOKIES **/
    var cookieInfoOptions = {
    	'autohide': false,
    	'btnhide': 'Cookies?',
    	'btnshow': 'OK. close box',
    	'cookieInfoPath': $('#cookieInfo').attr('data-cookie-info-path')
    }
    novicell.cookieinfo.init(cookieInfoOptions);
});

$(window).resize(function () {
    modstrom.master.adjustTrigger();

    modstrom.master.responsiveImage('default');
    modstrom.master.responsiveImage('mobile');
    modstrom.master.responsiveImage('tablet');
    modstrom.master.responsiveImage('desktop');

    //$('#nav-container').perfectScrollbar('update');
});

var modstrom = modstrom || {};

modstrom.master = modstrom.master || function () {
    function resetUI() {}

    function formFix() {
    	var form = $(".contour");

    	form.each(function (index) {

    		var formId = $(this).attr("id");
    		var form = $(this).find("form")
    		var formAction = form.attr("action");
    		
    		form.attr("action", formAction + "#" + formId);
    	});
    }

    function toggleSearch() {
        $('#header-search').click(function (e) {
            $('#header-search-form').fadeToggle();
            e.preventDefault();
        });
    }

    function testimonialOverlay() {
        $('.fancybox').fancybox({
            openEffect: 'none',
            closeEffect: 'none'
        });
    }

    function mainNavigation() {
        var container = '#nav-container';
        var nav = '#nav-header';

        $('.nav-trigger').click(function () {
            $(container).toggleClass('active');
        });
        
    }

    function newsPaging(selector) {

        if ($(selector).length) {
            var filter = $('.news-filter')
            var pager = $('.news-list-paging');
            var items = $('li', selector);
            var activeItems = $('.active', selector);
            var activeItemsLength = $('.active', selector).length;
            var perPage = 4;
            var showFrom = '';
            var showTo = '';

            if (activeItemsLength > perPage) {
                $(activeItems).slice(perPage).hide();
                $(pager).pagination({
                    items: activeItemsLength,
                    itemsOnPage: perPage,
                    onPageClick: function (pageNumber) {
                        showFrom = perPage * (pageNumber - 1);
                        showTo = showFrom + perPage;

                        $(activeItems).hide()
                             .slice(showFrom, showTo).show();
                    }
                });
            }

            var filterYear = $('#news-filter-year', filter);
            var filterMonth = $('#news-filter-month', filter);

            var year = '';
            var month = '';

            $('.news-filter select').change(function () {

                year = $(filterYear).val()
                month = $(filterMonth).val()

                $(items).each(function () {
                    var current = this;

                        // Filtering variables
                        if ($(current).data('year') == year && $(current).data('month') == month) {
                            $(current).addClass('active');

                        } else if (year == 'all-years' && $(current).data('month') == month){
                            $(current).addClass('active');

                        } else if (month == 'all-months' && $(current).data('year') == year){
                            $(current).addClass('active');

                        } else if (year == 'all-years' && month == 'all-months'){
                            $(current).addClass('active');

                        } else {
                            $(current).removeClass('active');
                        }                   
                });

                // Refire paging after filtering
                activeItems = $('.active', selector);
                activeItemsLength = $('.active', selector).length;
                showFrom = '';
                showTo = '';

                $(items).hide()                
                $(activeItems).show();

                if (activeItemsLength > perPage) {               
                    $(activeItems).slice(perPage).hide();

                    $(pager).pagination({
                        items: activeItemsLength,
                        itemsOnPage: perPage,
                        onPageClick: function (pageNumber) {
                            showFrom = perPage * (pageNumber - 1);
                            showTo = showFrom + perPage;

                            $(activeItems).hide()
                                 .slice(showFrom, showTo).show();
                        }
                    });
                } else {
                    $(pager).pagination('destroy');
                }
            });
        }
    }

    // Sliders
    function flexslider(selector) {
        $(selector).flexslider({
            controlNav: false,
            directionNav: false
        });
    }

    function productSlider() {
        $('.products-container').flexslider({
            slideshow: false,
            animation: "slide",
            animationLoop: false,
            itemWidth: 263,
            itemMargin: 30,
            directionNav: false,
			touch:true,
            move: 4
        });
    }

    function commentsSlider() {
    	$('.comments-container').flexslider({
            slideshow: false,
            animation: "slide",
            animationLoop: false           
        });
    }

    function testimonialSlider(selector) {
        $(selector).flexslider({
            slideshow: false,
            animation: "slide",
            animationLoop: false
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
                var forceWidth = el.getAttribute('data-forceWidth');

                var testFocal = focalPoint.indexOf("&")

                if (testFocal != -1) {
                    focalPoint = focalPoint.substr(0, testFocal)
                }
                
	            if (forceWidth > 0) {
		            w = forceWidth;
	            }


	            var wRnd = Math.round(w / 20) * 20;
                var hRnd = "0";

                if ($(el).attr('data-hrnd-' + breakpoint)) {
                    var proportion = $(el).attr('data-hrnd-' + breakpoint);
                    hRnd = Math.round(wRnd) * proportion;
                }

                if ($(el).hasClass('responsiveimg-background-' + breakpoint)) {
                    $(el).attr('style', 'background-image:url(' + src + '?' + focalPoint + '&width=' + wRnd + '&height=' + hRnd + '&mode=crop&quality=70&format=jpg);');
                } else {
                    el.insertAdjacentHTML('afterbegin', '<img src="' + src + '?' + focalPoint + '&width=' + wRnd + '&height=' + hRnd + '&mode=crop&quality=70&format=jpg" width="' + w + '" alt="' + alt + '">');
                }

                $(el).removeAttr('data-hrnd-' + breakpoint);
                $(el).removeAttr('data-imgsrc-' + breakpoint);
                $(el).removeAttr('data-imgalt-' + breakpoint);
                $(el).removeClass('responsiveimg-' + breakpoint);
                $(el).removeClass('responsiveimg-background-' + breakpoint);
            });
        }
    }

    // Question list
    function adjustTrigger() {
        $('.questions li').each(function () {
            var el = this;
            var trigger = $('.trigger', el);
            var height = $('.question', el).outerHeight();
            $(trigger).height(height);
        });
    }

    function questionTrigger() {
        $('.questions li').each(function () {
            var el = this;
            var trigger = $('.trigger', el);           
            $(trigger).click(function () {
                $(el).toggleClass('active');
                $('.answer-container', el).slideToggle();
            });
        });
    }

    function formContact() {

        // Update opening hours
        var select = '#contact-recipient';
        var output = '#contact-opening';
        var result = $(select).find(':selected').data('opening');

        $(output).val(result);
        $(select).change(function () {
            result = $(select).find(':selected').data('opening');
            $(output).val(result);
        });

        // toggle lables
        $('.input-container').each(function () {
            var container = this;
            var label = $('label', container);

            $(container).on('focusin', function () {              
                $(label).addClass('active');
            });
            $(container).on('focusout', function () {
                if ($('input', container).length) {
                    if ($('input', container).val() == '') {
                        $(label).removeClass('active');
                    }
                }
                if ($('textarea', container).length) {
                    if ($('textarea', container).val() == '') {
                        $(label).removeClass('active');
                    }
                }
            });
        });       
    }

    function scrollTo() {
    	$('a[href*=#]:not([href=#])').click(function () {
    		if(!$(this).hasClass("testimonial")){
    			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    				var target = $(this.hash);
    				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    				if (target.length) {
    					$('html,body').animate({
    						scrollTop: target.offset().top
    					}, 1000);
    					return false;
    				}
    			}
    		}
    	});
    }

    function showMoreCases() {
    	$('#caseButton').click(function () {
    		$(this).fadeOut();
    		$(".hidden-element").fadeIn();
    	});
    }

    function support() {
    	var support = $('#support'),
        supportRevealer = $('.support-revealer'),
        supportBody = $('.support-body');

    	supportRevealer.click(function () {
    		$(this).next().animate({ width: 'toggle' }, 'fast', function () {
    			if (supportBody.css('display') == 'block') {
    				supportRevealer.addClass('reveal');
    			} else {
    				supportRevealer.removeClass('reveal');
    			}
    		});
    	});
    }

    function toggleTestimonial() {
        if($('.section-testimonial-business').length) {
            var container = $('.section-testimonial-business');
            $('.testimonial', container).click(function() {
                var current = $(this);
                var collapsible = $('.collapsible-text', current);
                current.find('.dotBreak').fadeToggle();
                $(collapsible).slideToggle();
            });
        }
    }

    function backToTop() {
        var offset = 700,
            scroll_top_duration = 700,
            $back_to_top = $('.back-to-top');

        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('back-to-top-visible') : $back_to_top.removeClass('back-to-top-visible');
        });

        $back_to_top.on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                scrollTop: 0,
            }, scroll_top_duration
            );
        });
    }

    function hideUploadButtom() {
        $('input[type="file"]').before('<button class="file-trigger">Choose file</button>');
        $('input[type="file"]').hide();
        $('.file-trigger').click(function (e) {
            e.preventDefault()
            $(this).siblings('input[type="file"]').click();
            $(this).siblings('input[type="file"]').on('change',function (e) {
                var splittedValue = $(this).val().split('\\');
                $(this).siblings('.file-name').text(splittedValue[splittedValue.length - 1]);
            });
        });
    }
   



    return {
        resetUI: resetUI,
        mainNavigation: mainNavigation,
        flexslider: flexslider,
        responsiveImage: responsiveImage,
        adjustTrigger: adjustTrigger,
        questionTrigger: questionTrigger,
        productSlider: productSlider,
        commentsSlider: commentsSlider,
        formContact: formContact,
        testimonialSlider: testimonialSlider,
        newsPaging: newsPaging,
        testimonialOverlay: testimonialOverlay,
        toggleSearch: toggleSearch,
        scrollTo: scrollTo,
        support: support,
        showMoreCases: showMoreCases,
        toggleTestimonial: toggleTestimonial,
        formFix: formFix,
        backToTop: backToTop,
        hideUploadButtom:hideUploadButtom
    }
}();






