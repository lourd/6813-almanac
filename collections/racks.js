Racks = new Meteor.Collection('racks');

var DEFAULT_PLOT_X = 170;
var DEFAULT_PLOT_Y = 190;
var DEFAULT_PLOT_WIDTH = 400;
var DEFAULT_PLOT_HEIGHT = 100;

Meteor.methods({
    /*
     *  Make a new rack
     *  Set the default name and position attributes
    */
    new_rack : function(doc) {
        var defaultAttrs = {
            top: DEFAULT_PLOT_Y, 
            left: DEFAULT_PLOT_X, 
            width: DEFAULT_PLOT_WIDTH, 
            height: DEFAULT_PLOT_HEIGHT
        };
        // Pick a random number to make the name
        var defaultName = "Plot " + _.random(1000);
        doc.attributes = defaultAttrs;
        doc.name = defaultName;
        // Returning name and id for the related plots to be made off of
        return {rackId: Racks.insert(doc), rackName: defaultName};
    },
    /*
     *  Remove the rack with the passed in rackId
     *  and remove all plots in this rack
    */
    remove_rack: function(rackId) {
        // Remove all plots belonging to this rack as well
        var plots = Plots.find({rackId: rackId});
        plots.forEach(function (plot) {
            Plots.remove({_id: plot._id});
        });
        // Then remove the rack
        return Racks.remove({_id: rackId});
    },
    /*
     *  Combine two racks, given their IDs. Source rack is then removed
     *  Put all of the plots in the source rack in the destination rack
     *  The source plots go on top of the destination ones
    */
    combine_racks: function(sourceRackId, destRackId) {
        // Get the plots in order from top to bottom
        var transferredPlots = Plots.find({rackId: sourceRackId}, {sort: {stackIndex: 1}});
        var newPlotCount = transferredPlots.count();
        // Augment the receiving plots indices by the amount of new plots
        Plots.update({rackId: destRackId},
                    {$inc: {stackIndex: newPlotCount}},
                    { multi: true }
                    );
        
        // Update moved plots rackId and stackIndices to start at the top of the new one
        transferredPlots.forEach(function (plot, index) {
            plot.rackId = destRackId;
            plot.stackIndex = index;
            Plots.update(plot._id, plot);
        });

        // Remove old rack
        Racks.remove(sourceRackId);
    }
})
// Racks.allow({
//     insert: function (userId, doc) {
//         //...
//     },
//     update: function (userId, doc, fields, modifier) {
//         //...
//     },
//     remove: function (userId, doc) {
//         //...
//     },
//     fetch: ['owner'],
//     transform: function () {
//         //...
//     }
// });

// Racks.deny({
//     insert: function (userId, doc) {
//         //...
//     },
//     update: function (userId, doc, fields, modifier) {
//         //...
//     },
//     remove: function (userId, doc) {
//         //...
//     },
//     fetch: ['locked'],
//     transform: function () {
//         //...
//     }
// });