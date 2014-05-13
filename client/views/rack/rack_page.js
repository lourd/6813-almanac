Template.rackPage.helpers({
	// Gets the id of the plot currently shown on the carousel
	getCurrentPlotId: function () {
		// Gets stack index from slick itself
		var newStackIndex = $("#plot-carousel").slickCurrentSlide();
		// Don't have to filter by area because the router takes care of it
		return Plots.findOne({stackIndex: newStackIndex})._id;
	},
	// Returns the index of the current plot with jquery
	// Matches the plot's stackIndex
	getCurrentPlotIndex: function() {
		return $('#plot-carousel').slickCurrentSlide();
	}
});
Template.rackPage.rendered = function() {
	// slideIsGraph == -1 : no graphs are shown
	// slideIsGraph == <slide_index> : slide at <slide_index> is a graph
	Session.set('slideIsGraph', -1);	

	// Save the data context, a Rack
	var rackData = this.data;

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
				// Have to unslick and reslick to avoid bugs in slick
				$("#plot-carousel").unslick()
				// Add it with a Meteor.call
				Meteor.call('addPlot', newPlot, function(error, result) {
					if (error) {
						throwError(error.reason);
					} 
				});
				Template.carousel.slickify();
				$("#plot-carousel").slickGoTo(Plots.find().count()-1);

				// Reset the modal text box and close
				plotName.value = "";
				$(this).dialog("close");
				// Go to the newly added slide

			}, "Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

}

Template.rackPage.events({
	'click #add-plot': function () {
		$("#add-plot-popup").dialog("open");
	},

	'click #remove-plot': function() {
		// Make sure all slides are plots
		Session.set('slideIsGraph', -1);
		var rackData = this;
		var plotId = Template.rackPage.getCurrentPlotId();
		var carousel = $("#plot-carousel");
		// Get the current slide/plot index in the Stack
		var stackIndex = carousel.slickCurrentSlide();

		// Unslick the slide then reslick
		carousel.unslick();

		Meteor.call('deletePlot', plotId, rackData._id, stackIndex, function(error, id) {
			// If the rack has no more plots, go back to the area page and delete the rack
			if (Plots.find().count() === 0) {
				Router.go('areaPage', {_id: rackData.areaId});
				Racks.remove({_id: rackData._id}, function() {})
			}
		});
		Template.carousel.slickify();
		// Either the next one or the last one
		var nextPlotNum = Math.min(Plots.find().count()-1, stackIndex);
		carousel.slickGoTo(nextPlotNum);
	}
});


