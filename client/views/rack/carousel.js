Template.carousel.helpers ({
	plots: function() {
		var plotsWanted = Plots.find({rackId: this._id});
		var returnable = [];
		plotsWanted.forEach(function(plot) {
			returnable.push({plot:plot.name});
		});

		//Use fetch

		return returnable;
	}
	// }, isGraph: function(name) {
	// 	console.log(Session.get('graphPlot'));
	// 	if (Session.equals('graphType', undefined))
	// 		return false;
	// 	return Session.equals('graphPlot', name);
	// }
});


Template.carousel.rendered = function() {
	console.log("carousel rendered");

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
};