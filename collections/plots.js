Plots = new Meteor.Collection('plots');

Meteor.methods({
	addPlot: function(plotAttributes) {
        debugger
		var area = plotAttributes.data.areaId;
		var rack = plotAttributes.data._id;
		var name = plotAttributes.name;
        var stackIndex = plotAttributes.stackIndex;

		return newPlotId = Plots.insert({
			areaId: area,
			rackId: rack,
			name: name,
            stackIndex: stackIndex
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

		return Plots.remove({_id: toBeDeletedId});
	}
});
