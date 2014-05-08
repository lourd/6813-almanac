Template.slide.helpers({
	isGraph: function(plotName) {
		return false;
	}
});

Template.slide.rendered = function() {
	console.log("slide rendered");
	var el = this.firstNode;
	// console.log(this);
	// debugger
	if ($('#plot-carousel').hasClass('slick-initialized')) {
		console.log("new plot!");
		$('#plot-carousel').slickAdd(el);		
	}
	// $(el).addClass("slick-slide ui-selectee");

	// var car = document.getElementsByClassName("slick-track");
	// car[0].appendChild(el);
	// console.log(el);

}

Template.slide.created = function() {
	console.log("slide created");
}

Template.slide.destroyed = function () {
	console.log("slide destroyed");
};	

//////////////////////////////////////////////////
// Plots
//////////////////////////////////////////////////
Template.plotSlide.rendered = function() {
	// var el = this.firstNode;
	// $('#plot-carousel').slickAdd(el);
	console.log("plot slide rendered");

}

Template.plotSlide.created = function() {
	console.log("plot slide created");
}

Template.plotSlide.destroyed = function() {
	var el = this.firstNode;
	console.log("plot slide destroyed");
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
	console.log("graph rendered");
}

