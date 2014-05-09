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

	createGraph = function() {

		// this is where the graph will be drawn
		var plotDisplay = $(".plot-display");

		var w = 600;
		var h = 250;
		//var w = plotDisplay.width();
		//var h = plotDisplay.height();
		var padding = 30;

		// dummy data set 
		// TODO: replace with reading collection
		var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
        ];

        // these functions scale our data
        var xScale = d3.scale.linear()
       		.domain([0, d3.max(dataset, function(d) { return d[0]; })])
       		.range([padding, w - padding]);

       	var yScale = d3.scale.linear()
       		.domain([0, d3.max(dataset, function(d) { return d[1]; })])
       		.range([h - padding, padding]);

       	var xAxis = d3.svg.axis()
       		.scale(xScale)
       		.orient("bottom")
       		.ticks(5);

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
       			return xScale(d[0]);
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

	createRealGraph = function(){
		// this is where the graph will be drawn
		var plotDisplay = $("#d3-anchor");

		var w = 600;
		var h = 250;
		//var w = plotDisplay.width();
		//var h = plotDisplay.height();
		var padding = 30;

		// dummy data set 
		// TODO: replace with reading collection
		var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
        ];

        // these functions scale our data
        var xScale = d3.scale.linear()
       		.domain([0, d3.max(dataset, function(d) { return d[0]; })])
       		.range([padding, w - padding]);

       	var yScale = d3.scale.linear()
       		.domain([0, d3.max(dataset, function(d) { return d[1]; })])
       		.range([h - padding, padding]);

       	var xAxis = d3.svg.axis()
       		.scale(xScale)
       		.orient("bottom")
       		.ticks(5);

       	var yAxis = d3.svg.axis()
       		.scale(yScale)
       		.orient("left")
       		.ticks(5);

       	var readings = Readings.find();

       	var count = 5;
       	for (var i = 0; i < readings.length(); i++) {
       		console.log(count);
       		console.log(readings[i].value);
       		count++;
       	}
       	/*

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
       			return xScale(d[0]);
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
       	*/
	};

	// draws the graph
	// TODO: trigger this call when a particular trait is selected
	createGraph();
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
		carousel.slickRemove(carousel.slickCurrentSlide());

		Meteor.call('deletePlot', plotId, rackData._id, stackIndex, function(error, id) {
			// Error handling!
		});
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
				// Add it with a Meteor.call
				Meteor.call('addPlot', newPlot, function(error, result) {
					if (error) {
						throwError(error.reason);
					} 
				});

				// Reset the modal text box and close
				plotName.value = "";
				$(this).dialog("close");

			}, "Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

}


