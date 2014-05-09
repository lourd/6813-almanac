Template.carousel.helpers ({
	plots: function() {
		return Plots.find();
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

Template.carousel.events({
	'click .slick-prev' : function(e) {
		var currentSlide = $("#plot-carousel").slickCurrentSlide();
		console.log('current ' + currentSlide);
		Session.set('currentPlot', currentSlide);
	}, 'click .slick-next' : function(e) {
		var currentSlide = $("#plot-carousel").slickCurrentSlide();
		console.log('current ' + currentSlide);
		Session.set('currentPlot', currentSlide);
	}
})