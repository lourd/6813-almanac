Template.carousel.rendered = function() {
	
	$("#plot-carousel").slick({
		infinite: false,
		arrows: true,
		slidesToShow: 2,
		draggable: false
	});
};