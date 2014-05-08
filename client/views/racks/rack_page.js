Template.rackPage.created = function() {

	var plot = Plots.findOne({rackId:this.data._id});

	Session.set('currentPlot', plot.name);
}


Template.rackPage.rendered = function() {

	var rackId = this.data._id;
	var pageData = this.data;

	$("#add-plot").click(function () {
		$("#add-plot-popup").dialog("open");
		
	});

	$("#remove-plot").click(function () {
		var slideObject = $(".slick-active").children()[0];
		var plotName = $(slideObject).children()[0].innerHTML;

		var plotInfo = {
			data: pageData,
			name: plotName
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

				// var rack = Racks.findOne({name:'Rack 1'});
				var named = plotName.value;

				var plotInfo = {
					data: pageData,
					name: named
				};

				Meteor.call('addPlot', plotInfo, function(error, id) {
					if (error) {
						throwError(error.reason);
					} 
				});

				// Racks.update({_id: rack._id},{
				// 	$push: {plots: {plot: named}}
				// });

				plotName.value = "";

				// Plots.insert({
				// 	areaId: rack.areaId,
				// 	rackId: rack._id,
				// 	name: named,
				// 	stats: [
				// 		{value: '--F'},
				// 		{value: '---ppm'},
				// 		{value: '--%'}
				// 	]
				// });

				$(this).dialog("close");

			}, "Cancel": function () {
				$(this).dialog("close");
			}
		}
	});

}


