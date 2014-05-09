var MAX_HEIGHT = 250;
var MIN_WIDTH = 100;
var MAX_WIDTH = 600;
var MIN_HEIGHT = 80;

Template.slide.helpers({
	
});

Template.slide.rendered = function() {
	// var el = this.firstNode;
	
	// if ($('#plot-carousel').hasClass('slick-initialized')) {
	// 	$('#plot-carousel').slickAdd(el);		
	// }

}

Template.slide.created = function() {

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
	console.log("plot slide rendered");
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

Template.graphSlide.rendered = function(category) {

    // this is where the graph will be drawn
    var plotDisplay = $(".plot-display");

    var w = MAX_WIDTH;
    var h = MAX_HEIGHT;

    //var w = plotDisplay.width();
    //var h = plotDisplay.height();
    var padding = 35;

    var readings = [];

    if (category.indexOf("temperature") > -1) {
          readings = Readings.find({type: "temperature"}, {sort: {recorded_at: 1}});
    }
    else if (category.indexOf("humidity") > -1) {
          readings = Readings.find({type: "humidity"}, {sort: {recorded_at: 1}});
    }
    else if (category.indexOf("co2") > -1){
          readings = Readings.find({type: "co2"}, {sort: {recorded_at: 1}});
    }
    else {
          return;
    }

    // every datapoint is of the form [time_recorded, value]
    var dataset = [];
    readings.forEach(function(reading){
          dataset.push([reading.recorded_at, reading.value]);
    });

    var minDate = new Date(dataset[0][0]);
    var maxDate = new Date(dataset[dataset.length - 1][0]);

    var xScale = d3.time.scale()
          .domain([minDate, maxDate])
          .range([padding, w - padding]);

    var minValue = d3.min(dataset, function(d) { return d[1];});
    var maxValue = d3.max(dataset, function(d) { return d[1];});
    var yAxisBuffer = .25 * (maxValue - minValue);

    var yScale = d3.scale.linear()
          .domain([minValue - yAxisBuffer, maxValue + yAxisBuffer])
          .range([h - padding, padding]);

    var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");

    var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .ticks(5);

    // add an svg (canvasesque) element to our div anchor
    var svg = d3.select(".plot-display")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

    // draws a circle at every point
    svg.selectAll("circle")
          .data(dataset)
          .enter()
          .append("circle")
          .attr("cx", function(d) {
                return xScale(new Date(d[0]));
          })
          .attr("cy", function(d) {
                return yScale(d[1]);
          })
          .attr("r", 5);

    svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

    svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);
  	
}

