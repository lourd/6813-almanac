Template.carousel.helpers ({
	plots: function() {
		return Plots.find().fetch();
	},
	slickify: function() {
		//Create the carousel
		$("#plot-carousel").slick({
			infinite: false,
			arrows: true,
			slidesToShow: 1,
			draggable: false,
			dots: true
			// centerMode: true,
			// centerPadding: '40px'
		});
	}
});


Template.carousel.rendered = function() {
	Template.carousel.slickify();
	
};