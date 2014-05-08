Template.carousel.helpers ({
	plots: function() {
		return this.plots;
	}
	// }, isGraph: function(name) {
	// 	console.log(Session.get('graphPlot'));
	// 	if (Session.equals('graphType', undefined))
	// 		return false;
	// 	return Session.equals('graphPlot', name);
	// }
});


Template.carousel.rendered = function() {

	//Create the carousel
	$("#plot-carousel").slick({
		infinite: false,
		arrows: true,
		slidesToShow: 1,
		draggable: false,
		// centerMode: true,
		// centerPadding: '40px'
	});

	//Clicking on plot changes the bottom stats
	// $(".slick-track").selectable({
	// 	selected: function(event, ui) {
	// 		var header = $(ui.selected).children()[0];
	// 		var text = header.innerHTML;
	// 		Session.set('currentPlot', text);

	// 		$(header).css('background', 'white');
	// 	},

	// 	unselected: function(event, ui) {
	// 		var header = $(ui.unselected).children()[0];
	// 		$(header).css('background', 'green');
	// 		Session.set('graphPlot', Session.get('currentPlot'));
	// 	}
	// });
};

Template.carousel.created = function() {

}

Template.carousel.destroy = function() {

}