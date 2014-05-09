Template.areaPage.helpers({

    racks: function() {
        return Racks.find(); // automatically matched to this id in the router
    }

});

Template.areaPage.events({
    /*
     *  Add a plot div to the page
     *  dependent on the icon having css of #add-plot 
     *      Sets attributes to default positions and adds it to the collection
    */
    'click #add-plot': function (e) {
        // Make a rack
        var areaId = this._id;
        var newRack = {
            areaId: areaId
        };
        Meteor.call('new_rack', newRack, function (error, result) {
            // Make a plot
            var newPlot = {
                areaId: areaId,
                rackid: result.rackId,
                name: result.rackName,
                stackIndex: 0
            };
            Meteor.call('new_plot', newPlot, function( error, result) {
                console.log("new plot created");
                console.log(result);
            });
        });
    },

    'click #add-sensor': function(e) {
        console.log("add sensor clicked");
    },
    'click #clear': function (e) {
        // Racks.remove({areaId: this._id}); 
        // too bad we have to use the document id
        var racks = Racks.find();   // prefiltered by the router
        racks.forEach(function (rack) {
            Meteor.call('remove_rack', rack._id, function(error, result) {
                // Do something with an error
            })
        });
    }
});

