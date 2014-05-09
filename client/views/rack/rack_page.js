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


