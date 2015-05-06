
// document ready
$(function () {
    // optional: set custom breakpoints

    novicell.responsive.breakpoints({
        0: 'phone phone-portrait mobile',
        480: 'phone phone-landscape tablet-portrait mobile',
        768: 'tablet tablet-landscape mobile',
        980: 'desktop desktop-small',
        1185: 'desktop desktop-large'
    });

    novicell.responsive.init(projectName.master.resetUI());
    novicell.adjustFigureImage.init();
    novicell.lazyload.content(projectName.master.resetUI());
    novicell.lazyload.image();

    projectName.master.magic($('.all-the-things'));

}); // document ready end


// CUSTOM SECTION - PLACE YOUR NICE PROJECT CODE HERE. :)
// REPLACE THE projectName OBJECT TO SOMETHING RELEVANT

var projectName = projectName || {};
projectName.master = projectName.master || function () {
    // responsive ready callback
    function resetUI() {

        // run this stuff when "resizing" the DOM/after a resize and so on
    }

    //Sample function
    function niceCodeForMyCustomer(selectors) {
        $(selectors).each(function () {
            // do your magic
        });
    }

    return {
        resetUI: resetUI,
        magic: niceCodeForMyCustomer
    }
}(); // customerName






