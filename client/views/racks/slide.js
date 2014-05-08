Template.slide.helpers({
	isGraph: function(plotName) {
		return false;
	}
});

Template.slide.rendered = function() {
	var el = this.firstNode;
	// console.log(this);
	// debugger
	if ($('#plot-carousel').hasClass('slick-initialized')) {
		$('#plot-carousel').slickAdd(el);		
	}
	// $(el).addClass("slick-slide ui-selectee");

	// var car = document.getElementsByClassName("slick-track");
	// car[0].appendChild(el);
	// console.log(el);

}

Template.slide.created = function() {

}

Template.slide.destroyed = function () {
	console.log("slide removed");
};	

//////////////////////////////////////////////////
// Plots
//////////////////////////////////////////////////
Template.plotSlide.rendered = function() {
	// var el = this.firstNode;
	// $('#plot-carousel').slickAdd(el);

}

Template.plotSlide.created = function() {
}

Template.plotSlide.destroyed = function() {
	var el = this.firstNode;
	var currentSlide = $("#plot-carousel").slickCurrentSlide();
	$('#plot-carousel').slickRemove(currentSlide);
	$('#plot-carousel').slickGoTo(0);

}

Template.plotSlide.helpers({
	lastUpdated: function() {
		return new Date();
	}
});

//////////////////////////////////////////////////
// Graphs
//////////////////////////////////////////////////
Template.graphSlide.helpers({
	graphType: function() {
		return Session.get('graphType');
	}
});

Template.graphSlide.rendered = function() {

}

