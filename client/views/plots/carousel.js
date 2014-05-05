Template.carousel.rendered = function() {

	Session.set('currentPlot', 'Plot 3');

	//Create the carousel
	$("#plot-carousel").slick({
		infinite: false,
		arrows: true,
		slidesToShow: 2,
		draggable: false
	});

	//Add some functionality to change the bottom template based on the buttons pressed
	$(".plot-display").click( function () {
		var text = $(this).children()[0].innerHTML;
		Session.set('currentPlot', text);
	});
};