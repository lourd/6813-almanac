Session.set('currentPlot', 'Plot 1');

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

	});

	$("#add-plot-popup").dialog({
		autoOpen: false,
		modal: true,
		buttons: {
			"Add plot!": function () {
				var rack = Racks.findOne({name:'Rack 1'});
				var named = plotName.value;

				var area = rack.areaId;

				Racks.update({_id: rack._id},{
					$push: {plots: {plot: named}}
				});

				plotName.value = "";

				Plots.insert({
					areaId: area,
					rackId: rack,
					name: named,
					stats: [
						{value: '--F'},
						{value: '---ppm'},
						{value: '--%'}
					]
				})

				$(this).dialog("close");

			}, "Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

}
