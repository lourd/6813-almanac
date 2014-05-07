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
        var DEFAULT_PLOT_X = "170";
        var DEFAULT_PLOT_Y = "190";
        var DEFAULT_PLOT_WIDTH = "400";
        var DEFAULT_PLOT_HEIGHT = "100";

        // Just giving it a random name
        var rackName = "Plot " + _.random(1000);

        var newRack = {
            areaId: this._id,
            name: rackName,
            attributes: {   top: DEFAULT_PLOT_Y, 
                            left: DEFAULT_PLOT_X, 
                            width: DEFAULT_PLOT_WIDTH, 
                            height: DEFAULT_PLOT_HEIGHT
                        },
            plots: [
                // Plots start out with the same rackname
                {plot: rackName}
            ]
        };
        Racks.insert(newRack);
    },

    'click #add-sensor': function(e) {
        console.log("add sensor clicked");
    },
    'click #clear': function (e) {
        // Racks.remove({areaId: this._id}); 
        // too bad we have to use the document id
        var racks = Racks.find();   // prefiltered by the router
        racks.forEach(function (rack) {
            Racks.remove({_id: rack._id});
        });
    }
});

