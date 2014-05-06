Template.quickStats.rendered = function() {
	$("#stats-container").selectable({
		selected: function(event, ui) {
			var text = $(ui.selected).children()[0].innerHTML;

			Session.set('graphPlot', Session.get('currentPlot'));
			Session.set('graphType', text);
		},

		unselected: function(event, ui) {

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

