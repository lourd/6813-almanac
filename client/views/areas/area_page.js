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

Template.rack.rendered = function () {
    // Get the div element from the template object
    var rackDiv = this.$('.shape');
    rackDiv.resizable({
            handles: "n, e, s, w", // only edges handles
        })
    .draggable({ 
        containment: "#drawing-container",
        stack: ".shape"
    })
    .droppable({
        accept: ".plot",
        activeClass: "plot-active",
        greedy: true,
        hoverClass: "plot-hovered"
        },{
        /* 
         * triggered when an acceptable drag starts dragging
         * @param event (Event)
         * @param ui: {draggable, helper, position, offset} 
        */
        activate: function(event, ui) {

        },
        /* triggered when an accepted draggable stops dragging
         * @param ui (Object)
         *  - draggable: jquery obj repr the draggable el
         *  - helper: jquery obj repr helper being dragged
         *  - position: current css pos of helper as {top, left}
         *  - offset: current offset pos of the helper as {top, left}
        */
        deactivate: function(event, ui) {

        },
        /*
         *  trig when acceptable draggable is dropped on droppable
         *  based on `tolerance` option
         *  @param event (Event)
         *  @param ui: {draggable, helper, position, offset}
        */
        drop: function(event, ui) {

        },
        /*
         *  draggable dragged out of the droppable
         *  @param ui is empty
        */
        out: function(event, ui) {

        },
        /*
         *  accepted draggable is dragged over droppable
         *  based on `tolerance` option
         *  @param event (Event)
         *  @param ui: {draggable, helper, position, offset}
        */
        over: function(event, ui) {

        }

    })

};

Template.rack.helpers({

});