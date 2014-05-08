Session.set('currentPlot', 'Plot 3');

Template.rackPage.helpers({

});

Template.rackPage.rendered = function() {

	$("#add-plot").click(function () {
		$("#add-plot-popup").dialog("open");
	});

	$("#remove-plot").click(function () {
		var plotName = Session.get('currentPlot');
		var rack = Racks.findOne({name: 'Rack 1'});

		Racks.update({_id:rack._id},{
			$pull: {plots: {plot:plotName}}
		});

		Session.set('currentPlot', 'Plot 3');
	});

	$("#add-plot-popup").dialog({
		autoOpen: false,
		buttons: {
			"Add plot!": function () {
				var rack = Racks.findOne({name:'Rack 1'});

				Racks.update({_id: rack._id},{
					$push: {plots: {plot: "Plot added"}}
				});


				// Plots.insert({
				// 	name: 'Plot added',
				// 	stats: [
				// 		{value: '--F'},
				// 		{value: '---ppm'},
				// 		{value: '--%'}
				// 	]
				// })
				$(this).dialog("close");

			}, "Cancel": function () {
				console.log("canceled");
				$(this).dialog("close");
			}
		}
	});

	//attempt number one at add plots well
	function addPlot() {
		var elements = document.getElementsByClassName("plot-display");

		for (var i=0; i<elements.length;i++) {
			if ($(elements[i].parentNode).hasClass("slick-track")) {

			} else {
				console.log("no parent node");
			}
		}
	}
}

