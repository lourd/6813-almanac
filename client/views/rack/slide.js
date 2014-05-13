var MAX_HEIGHT = 250;
var MIN_WIDTH = 100;
var MAX_WIDTH = 600;
var MIN_HEIGHT = 80;

Template.slide.helpers({
	isGraph: function(position) {
		return Session.equals('slideIsGraph', this.stackIndex);
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
		if (aspect > 0.5) {	// if it's a taller narrow rectangle
			return Math.max(MAX_HEIGHT/aspect, MIN_WIDTH);
		} else { // if it's a fat rectangle
			return Math.min(MAX_HEIGHT/aspect, MAX_WIDTH);
		}
	},
	scaledHeight: function() {
		var rack = Racks.findOne();
		var aspect = rack.attributes.height / rack.attributes.width;
		if (aspect > 0.5) { // if it's a squat rectangle
			return Math.min(aspect*MAX_WIDTH, MAX_HEIGHT);
		} else {
			return Math.max(aspect*MAX_WIDTH, MIN_HEIGHT);
		}
	},
  // Using these to center the div vertically on the carousel
  halfWidth: function() {
    // Get the height & width of the rack
    var rack = Racks.findOne(); // works cause we're only subscribed to the one current rack
    var aspect = rack.attributes.height / rack.attributes.width;
    var width;
    // scale the div correctly
    if (aspect > 0.5) { // if it's a taller narrow rectangle
      width = Math.max(MAX_HEIGHT/aspect, MIN_WIDTH);
    } else { // if it's a fat rectangle
      width = Math.min(MAX_HEIGHT/aspect, MAX_WIDTH);
    }
    return width/2;
  },
  // Using to center div vertically on carousel
  halfHeight: function() {
    var rack = Racks.findOne();
    var aspect = rack.attributes.height / rack.attributes.width;
    var height;
    if (aspect > 0.5) { // if it's a squat rectangle
      height = Math.min(aspect*MAX_WIDTH, MAX_HEIGHT);
    } else {
      height = Math.max(aspect*MAX_WIDTH, MIN_HEIGHT);
    }
    return height/2;
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
    // Make sure to render the graph slide
		return Session.get('graphType');
	}
});

Template.graphSlide.rendered = function() {
    /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
  ;

  chart.xAxis     //Chart x-axis settings
      .axisLabel('Time (ms)')
      .tickFormat(d3.format(',r'));

  chart.yAxis     //Chart y-axis settings
      .axisLabel('Voltage (v)')
      .tickFormat(d3.format('.02f'));

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos();   //You need data...

  d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
/**************************************
 * Simple test data generator
 */
function sinAndCos() {
    var sin = [],sin2 = [],
        cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.sin(i/10)});
      sin2.push({x: i, y: Math.sin(i/10) *0.25 + 0.5});
      cos.push({x: i, y: .5 * Math.cos(i/10)});
    }

    //Line chart data should be sent as an array of series objects.
    return [
      {
        values: sin,      //values - represents the array of {x,y} data points
        key: 'Sine Wave' //key  - the name of the series.
        //color: '#ff7f0e'  //color - optional: choose your own line color.
      },
      {
        values: cos,
        key: 'Cosine Wave'
        //color: '#2ca02c'
      },
      {
        values: sin2,
        key: 'Another sine wave'
        //color: '#7777ff',
        //area: true      //area - set to true if you want this line to turn into a filled area chart.
      }
    ];
  }
    //////////////////////

    // console.log("GENGRAPH");
    // var type = Session.get('graphType');

    // console.log(type);

    // // this is where the graph will be drawn
    // var plotDisplay = $(".graph-display");

    // var w = MAX_WIDTH;
    // var h = MAX_HEIGHT;

    // // margin used in the graph
    // var padding = 35;

    // var readings;

    // if (type.indexOf("temperature") > -1) {
    //       readings = Readings.find({type: "temperature"}, {sort: {recorded_at: 1}});
    // }
    // else if (type.indexOf("humidity") > -1) {
    //       readings = Readings.find({type: "humidity"}, {sort: {recorded_at: 1}});
    // }
    // else if (type.indexOf("co2") > -1){
    //       readings = Readings.find({type: "co2"}, {sort: {recorded_at: 1}});
    // }
    // else {
    //       return;
    // }

    // // every datapoint is of the form [time_recorded, value]
    // var dataset = [];
    // readings.forEach(function(reading){
    //       dataset.push([reading.recorded_at, reading.value]);
    // });

    // var minDate = new Date(dataset[0][0]);
    // var maxDate = new Date(dataset[dataset.length - 1][0]);

    // var xScale = d3.time.scale()
    //       .domain([minDate, maxDate])
    //       .range([padding, w - padding]);

    // var minValue = d3.min(dataset, function(d) { return d[1];});
    // var maxValue = d3.max(dataset, function(d) { return d[1];});
    // var yAxisBuffer = .25 * (maxValue - minValue);

    // var yScale = d3.scale.linear()
    //       .domain([minValue - yAxisBuffer, maxValue + yAxisBuffer])
    //       .range([h - padding, padding]);

    // var xAxis = d3.svg.axis()
    //       .scale(xScale)
    //       .orient("bottom");

    // var yAxis = d3.svg.axis()
    //       .scale(yScale)
    //       .orient("left")
    //       .ticks(5);

    // // add an svg (canvasesque) element to our div anchor
    // var svg = d3.select(".graph-display")
    //       .append("svg")
    //       .attr("width", w)
    //       .attr("height", h);

    // // draws a circle at every point
    // svg.selectAll("circle")
    //       .data(dataset)
    //       .enter()
    //       .append("circle")
    //       .attr("cx", function(d) {
    //             return xScale(new Date(d[0]));
    //       })
    //       .attr("cy", function(d) {
    //             return yScale(d[1]);
    //       })
    //       .attr("r", 5);

    // svg.append("g")
    //       .attr("class", "axis")
    //       .attr("transform", "translate(0," + (h - padding) + ")")
    //       .call(xAxis);

    // svg.append("g")
    //       .attr("class", "axis")
    //       .attr("transform", "translate(" + padding + ",0)")
    //       .call(yAxis);
}
