Template.quickStats.rendered = function() {
	$("#stats-container").selectable();
}


Template.quickStats.helpers({
	// stats: function() {
	// 	var current = Session.get('currentPlot');

	// 	if (current === undefined) {
	// 		Session.set('currentPlot', 'Plot 3');
	// 	}
	// 	console.log(current);

	// 	var plot = Plots.findOne({name: current});

	// 	return plot.stats;
	// }
});

