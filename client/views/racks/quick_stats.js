Template.quickStats.rendered = function() {

	$(".stat-details").hide();

	// this function toggles showing the details for area's sensor information
	$(".stat-details-button").click(function() {
		if ($(".stat-details-button").val() === '+') {
			$(".stat-details").show();
			$(".stat-details-button").val("-");
		}
		else {
			$(".stat-details").hide();
			$(".stat-details-button").val('+');
		}
	});

	$("#stats-container").selectable({
		selected: function(event, ui) {
			var text = $(ui.selected).children()[0].innerHTML;

			Session.set('graphPlot', Session.get('currentPlot'));
			Session.set('graphType', text);
		},

		unselected: function(event, ui) {

		}
	});

	$(".ui-selectee").mouseover(function() {
		var child = $(this).children()[0];
		if (child != undefined) {
			//Add some color changing function so there is
			//affordance (so we know buttons can be clicked)
			var text = child.innerHTML;
		}		
	});
}


Template.quickStats.helpers({
	stats: function() {
		var current = Session.get('currentPlot');
		var plot = Plots.findOne({name: current});

		return plot.stats;
	}
});