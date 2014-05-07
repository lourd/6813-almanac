Template.areaPage.helpers({

    racks: function() {
        return Racks.find(); // automatically matched to this id in the router
    }

});

Template.areaPage.events({
    'click #add-plot': function (e) {
        // Give the router a number-based name by default
        var numPlot = Racks.find().count() + 1;
        console.log(numPlot);
        console.log("plot created");
        var newRack = {
            areaId: this._id,
            name: 'Plot ' + numPlot,
            attributes: {position: "absolute", top: "35px", left: "57px", width: "367px", height: "148px"},
            plots: [
                {plot: 'Plot 1'}
            ]
        };
        Racks.insert(newRack);
    },

    'click #add-sensor': function(e) {
        console.log("add sensor clicked");
    },

    'click #clear': function (e) {
        console.log("clear clicked");
    },

    'click #save': function(e) {
        console.log("save clicked");
    },
    'click #load': function(e) {
        console.log("load clicked");
    }
});


Template.rackShape.helpers({

});

Template.rackShape.rendered = function () {
    // Get the div element from the template object
    var shape = this.$('.shape');
    shape.resizable({
            handles: "n, e, s, w"
        });
    shape.draggable({ 
        containment: "#drawing-container",
        stack: ".shape"
    });
};