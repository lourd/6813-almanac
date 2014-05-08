Plots = new Meteor.Collection('plots');


Meteor.methods({
	addPlot: function(plotAttributes) {

		var area = plotAttributes.data.areaId;
		var rack = plotAttributes.data._id;
		var name = plotAttributes.name;

		console.log(name);

		var newPlotId = Plots.insert({
			areaId: area,
			rackId: rack,
			name: name,
			stats: [
				{value: '--F'},
				{value: '---ppm'},
				{value: '--%'}
			]
		});

		console.log(Plots.findOne({_id: newPlotId}));
	}
})
