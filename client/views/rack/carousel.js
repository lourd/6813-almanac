Template.carousel.helpers ({
	plots: function() {
		return Plots.find({}, {sort: {stackIndex: 1}});
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
		Session.set('slideIsGraph', -1);
	}, 
	'click .slick-next' : function(e) {
		Session.set('slideIsGraph', -1);
	}
})