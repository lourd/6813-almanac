Template.rackPage.created = function() {

	// don't need to give a rack id, filtered on subscribe

	var plot = Plots.findOne();	

	Session.set('currentPlot', plot.name);
}


Template.rackPage.rendered = function() {
	debugger
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
					name = plotName.value
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


