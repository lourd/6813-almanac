Racks = new Meteor.Collection('racks');

var DEFAULT_PLOT_X = 170;
var DEFAULT_PLOT_Y = 190;
var DEFAULT_PLOT_WIDTH = 400;
var DEFAULT_PLOT_HEIGHT = 100;

Meteor.methods({
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
        return {rackId: Racks.insert(doc), rackName: defaultName};
    },
    remove_rack: function(rackId) {
        // Remove all plots belonging to this rack as well
        var plots = Plots.find({rackId: rackId});
        plots.forEach(function (plot) {
            Plots.remove({_id: plot._id});
        });
        // Then remove the rack
        return Racks.remove({_id: rackId});
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