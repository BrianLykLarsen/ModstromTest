

/*	Example 1: using selectors with the novicell JavaScript Library

	HTML:

	<div style="padding:50px;border:3px solid #ccc;">
		<a href="#btntarget" id="bigbtnID" class="btn btn-large" data-msg="Jeg er den første knap">den ene</a>
		<a href="#btntarget" class="bigbtnCLASS btn btn-large" data-msg="Hej jeg er den anden knap">den anden</a>
		<a href="#btntarget" class="bigbtnCLASS btn btn-large"  data-msg="Davs jeg er den sidste knap">den tredje</a>
		<div id="btntarget" style="padding:10px;font-weight:bold;">Hi there</div>
	</div>

*/

// document ready
$(function () {

	novicell.example1.selectors($('#bigbtnID,.bigbtnCLASS'));
});

novicell.example1 = new function(){
	this.selectors = function(selectors){
		selectors.each(function(){
			$(this).on('click',function(e){
				e.preventDefault();
				$($(this).attr('href')).html($(this).data('msg'));
			});
		});
	}
}
