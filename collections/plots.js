Plots = new Meteor.Collection('plots');

Meteor.methods({
	addPlot: function(plotAttributes) {

		var area = plotAttributes.data.areaId;
		var rack = plotAttributes.data._id;
		var name = plotAttributes.name;

		var newPlotId = Plots.insert({
			areaId: area,
			rackId: rack,
			name: name,
			stats: [
            	{name: 'Temperature', value: 65, units: 'F'},
            	{name: 'CO2 Level', value: 700, units: 'ppm'},
            	{name: 'Humidity', value: 15, units: '%'}
			]
		});
	}, deletePlot: function(plotAttributes) {
		var areaId = plotAttributes.data.areaId;
		var rack = plotAttributes.data._id;
		var name = plotAttributes.name;

		var toBeDeletedId = Plots.findOne({
			areaId: areaId,
			rackId: rack,
			name: name
		});

		Plots.remove({_id: toBeDeletedId});
	}
});
