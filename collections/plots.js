Plots = new Meteor.Collection('plots');

Meteor.methods({
    // Add plot and figure out the correct stack index
    // Right now just adds plot to the end, or the bottom
    // of the rack. 

	addPlot: function(doc) {
        // Get the number of plots and add 1 for stack index
        var plotCount = Plots.find({rackId: rackId}).count();
        doc.stackIndex = plotCount + 1;
		return newPlotId = Plots.insert(doc);
	}, 
    
    // Delete plot by id
    deletePlot: function(rackId) {
        return Plots.remove({_id: rackId});
    }, 

    // Delete plot with rack id and rack name
    // Used on rackPage
    deleteWithRackAndName: function(rackId, rackName) {
        // Find the plot
		var plotId = Plots.findOne({
			rackId: rackId,
			name: rackName
		});
		return Meteor.call('deletePlot', plotId, function(error, result) {

        });
	}
});
