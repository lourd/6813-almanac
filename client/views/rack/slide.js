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
	}
});

Template.plotSlide.rendered = function() {

}

Template.plotSlide.destroyed = function() {
	// console.log("plot slide destroyed");
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
    nv.addGraph(function() {
        // Make this bitch reactive
        Deps.autorun(function () {
            // debugger
            var varType = Session.get('graphType');
            var chart = nv.models.lineChart()
                          //Adjust chart margins to give the x-axis some breathing room.
                          .margin({left: 100})
                          //We want nice looking tooltips and a guideline!
                          .useInteractiveGuideline(true)  
                          //how fast do you want the lines to transition?
                          .transitionDuration(350)
                          //Show the legend, allowing users to turn on/off line series.
                          .showLegend(true)
                          //Show the y-axis
                          .showYAxis(true)
                          //Show the x-axis
                          .showXAxis(true);        

            chart.xAxis     //Chart x-axis settings
                .axisLabel('Time (h:m:s)')
                .tickFormat(function(d) {
                      return d3.time.format('%X')(new Date(d))
                    });
            chart.yAxis     //Chart y-axis settings
                .axisLabel(varType)
                .tickFormat(d3.format('.02f'));
            // Data for the graph
            var myData = [];
            Sensors.find().forEach(function (sensor) {
                var sensorData = [];
                // Get the readings for this sensor, for this type, in ascending time order
                Readings.find({$and: [
                      {sensorId: sensor._id},
                      {type: varType}
                      ]},
                      {sort: {recorded_at: 1}}
                      ).forEach(function (reading) {
                  sensorData.push({
                    x: reading.recorded_at,
                    y: reading.value
                  });
                });
                myData.push({
                  values: sensorData,
                  key: sensor.name
                });
            });
            d3.select('#chart svg')    //Select the <svg> element you want to render the chart in.   
                .datum(myData)         //Populate the <svg> element with chart data...
                .call(chart);          //Finally, render the chart!

            //Update the chart when window resizes.
            nv.utils.windowResize(function() { chart.update() });
            return chart;
        });
    });
}
