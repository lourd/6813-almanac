var MAX_HEIGHT = 250;
var MIN_WIDTH = 100;
var MAX_WIDTH = 600;
var MIN_HEIGHT = 80;

Template.slide.helpers({
	
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
Template.plotSlide.helpers({
	scaledWidth: function () {
		// Get the height & width of the rack
		var rack = Racks.findOne(); // works cause we're only subscribed to the one current rack
		var aspect = rack.attributes.height / rack.attributes.width;
		// scale the div correctly
		if (aspect > 0.5) {	// if it's a tall rectangle
			return Math.max(MAX_HEIGHT/aspect, MIN_WIDTH);
		} else { // if it's a fat rectangle
			return MAX_WIDTH;
		}
	},
	scaledHeight: function() {
		var rack = Racks.findOne();
		var aspect = rack.attributes.height / rack.attributes.width;
		if (aspect > 0.5) {
			return MAX_HEIGHT;
		} else {
			return Math.max(aspect*MAX_WIDTH, MIN_HEIGHT);
		}
	}
});
Template.plotSlide.rendered = function() {
	
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

