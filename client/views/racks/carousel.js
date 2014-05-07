Template.carousel.helpers ({
	plots: function() {
		return this.plots;
	},

	isGraph: function(name) {
		if (Session.equals('graphType', undefined))
			return false;
		return Session.equals('graphPlot', name);
	}
});


Template.carousel.rendered = function() {

	Session.set('currentPlot', 'Plot 3');

	var plot_car = $("#plot-carousel");
	if( plot_car.hasClass("slick-initialized") ) {
		plot_car.unslick();
	}
	//Create the carousel
	$("#plot-carousel").slick({
		infinite: false,
		arrows: true,
		slidesToShow: 2,
		draggable: false
	});



	//Clicking on plot changes the bottom stats
	$(".slick-track").selectable({
		selected: function(event, ui) {
			var header = $(ui.selected).children()[0];
			var text = header.innerHTML;
			Session.set('currentPlot', text);

			$(header).css('background', 'white');
		},

		unselected: function(event, ui) {
			var header = $(ui.unselected).children()[0];
			$(header).css('background', 'green');
			Session.set('graphPlot', Session.get('currentPlot'));
		}
	});
};