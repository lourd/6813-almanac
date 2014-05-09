Template.rackPage.created = function() {

	// don't need to give a rack id, filtered on subscribe

	var plot = Plots.findOne();	

	Session.set('currentPlot', plot.name);
}


Template.rackPage.rendered = function() {

	var rackId = this.data._id;

	$("#add-plot").click(function () {
		$("#add-plot-popup").dialog("open");
		
	});

	$("#remove-plot").click(function () {
		var slideObject = $(".slick-active").children()[0];
		var plotName = $(slideObject).children()[0].innerHTML;


		Racks.update({_id:rackId},{
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
				});

				$(this).dialog("close");

			}, "Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

}


