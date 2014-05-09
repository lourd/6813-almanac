Plots = new Meteor.Collection('plots');

Meteor.methods({
    // Add plot and figure out the correct stack index
    // Right now just adds plot to the end, or the bottom
    // of the rack. 

	addPlot: function(doc) {
        // Get the number of plots and add 1 for stack index
        var plotCount = Plots.find({rackId: doc.rackId}).count();
        doc.stackIndex = plotCount;
		return newPlotId = Plots.insert(doc);
	}, 
    
    // Delete plot by id and rack id, with stackIndex
    deletePlot: function(plotId, rackId, stackIndex) {
        console.log("delete plot called!");
        Plots.update({ $and : [
                            {rackId: rackId} ,
                            {stackIndex: {$gt: stackIndex}}
                            ]},
                        {$inc: {stackIndex: -1} },
                        {multi: true}
                        );

        // Update the indexes of all plots in the stack
        return Plots.remove({_id: plotId});
    }
});
