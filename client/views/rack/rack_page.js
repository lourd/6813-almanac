Template.rackPage.helpers({
	getCurrentPlotId: function () {
		// Get the slick carousel
		var carousel = $("#plot-carousel");
		// Gets stack index from slick itself
		var newStackIndex = carousel.slickCurrentSlide();
		// Don't have to filter by area because the router takes care of it
		var currentPlot = Plots.findOne({stackIndex: newStackIndex});
		return currentPlot._id;
	}
});

Template.rackPage.rendered = function() {

	createRealGraph = function(){
		// this is where the graph will be drawn
		var plotDisplay = $(".plot-display");

		var w = 600;
		var h = 250;
		//var w = plotDisplay.width();
		//var h = plotDisplay.height();
		var padding = 35;

            // open all readings by Temperature
            // TODO: change this to work with any parameter
            var readings = Readings.find({type: "temperature"}, {sort: {recorded_at: 1}});

            console.log("Number of Readings: " + readings.count());

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
	};

	// draws the graph
	// TODO: trigger this call when a particular trait is selected
	createRealGraph();

	// Save the data context, a Rack
	var rackData = this.data;

	$("#add-plot").click(function () {
		// Open the add plot modal
		$("#add-plot-popup").dialog("open");
	});

	/*
	 *	Listener for the remove plot button
	*/
	$("#remove-plot").click(function () {
		var plotId = Template.rackPage.getCurrentPlotId();
		var carousel = $("#plot-carousel");
		// Get the current slide/plot index in the Stack
		var stackIndex = carousel.slickCurrentSlide();

		// Unslick the slide
		// So many bugs...
		console.log("unslick called");
		carousel.unslick();

		Meteor.call('deletePlot', plotId, rackData._id, stackIndex, function(error, id) {
			// Error handling!
		});
		Template.carousel.slickify();
	});

	/*
	 *	Options and actions for the add plot modal
	*/
	$("#add-plot-popup").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			"Add plot!": function () {
				// Build the new plot object
				var newPlot = {
					areaId: rackData.areaId,
					rackId: rackData._id,
					name: plotName.value
				};
				$("#plot-carousel").unslick()
				// Add it with a Meteor.call
				Meteor.call('addPlot', newPlot, function(error, result) {
					if (error) {
						throwError(error.reason);
					} 
				});
				Template.carousel.slickify();

				// Reset the modal text box and close
				plotName.value = "";
				$(this).dialog("close");

			}, "Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

}


