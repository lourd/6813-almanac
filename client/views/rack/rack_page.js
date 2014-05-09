Template.rackPage.created = function() {

	// don't need to give a rack id, filtered on subscribe

	var plot = Plots.findOne();	

	Session.set('currentPlot', plot.name);
}


Template.rackPage.rendered = function() {

	createGraph = function() {
		//var w = 600;
		//var h = 250;

		// this is where the graph will be drawn
		var plotDisplay = $(".plot-display");

		var w = plotDisplay.width();
		var h = plotDisplay.height();
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

	// draws the graph
	// TODO: trigger this call when a particular trait is selected
	createGraph();

	var rackData = this.data;

	$("#add-plot").click(function () {
		$("#add-plot-popup").dialog("open");
		
	});

	$("#remove-plot").click(function () {
		var slideObject = $(".slick-active").children()[0];
		var plotName = $(slideObject).children()[0].innerHTML;
		var plotCount = Plots.find().count();

		var plotInfo = {
			data: rackData,
			name: plotName,
			stackIndex: plotCount
		}

		var currentSlide = $("#plot-carousel").slickCurrentSlide();
		$('#plot-carousel').slickRemove(currentSlide);

		Meteor.call('deletePlot', plotInfo, function(error, id) {
			if (error) {
				throwError(error.reason);
			}
		});


		Racks.update({_id:rackId},{
			$pull: {plots: {plot:plotName}}
		});

	});

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


