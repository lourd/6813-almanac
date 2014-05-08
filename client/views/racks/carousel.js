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
		dots: true
		// centerMode: true,
		// centerPadding: '40px'
	});
};

Template.carousel.created = function() {

}

Template.carousel.destroy = function() {

}


Template.carousel.events({
	'click .slick-prev' : function(event) {
		var slideObject = $(".slick-active").children()[0];
		var plotName = $(slideObject).children()[0].innerHTML;
		Session.set('currentPlot', plotName);

	}, 'click .slick-next' : function(event) {
		var slideObject = $(".slick-active").children()[0];
		var plotName = $(slideObject).children()[0].innerHTML;
		Session.set('currentPlot', plotName);
	}
})