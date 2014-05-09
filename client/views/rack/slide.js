var MAX_HEIGHT = 250;
var MIN_WIDTH = 100;
var MAX_WIDTH = 600;
var MIN_HEIGHT = 80;

Template.slide.helpers({
	isGraph: function(position) {
		return Session.equals('graphPlot', position);

	}
});

Template.slide.rendered = function() {


}

Template.slide.created = function() {

}

Template.slide.destroyed = function () {

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

Template.plotSlide.destroyed = function() {
	console.log("plot slide destroyed");
}

//////////////////////////////////////////////////
// Graphs
//////////////////////////////////////////////////
Template.graphSlide.helpers({
	graphType: function() {
		return Session.get('graphType');
	}
});

Template.graphSlide.rendered = function(type) {
	console.log(type);
}

