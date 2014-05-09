var SUBPLOT_OFFSET_X = 7;
var SUBPLOT_OFFSET_Y = SUBPLOT_OFFSET_X;

Template.rack.helpers({
    // Data context here is still the rack
    plots: function () {
        console.log("plots called");
        var plots = Plots.find({rackId: this._id});
        // Save the number of plots
        var numPlots = plots.count();
        // Save the 'this' context for below
        var rackParent = this;
        return plots.map( function(plot) {
            plot.parent = rackParent;
            plot.numPlots = numPlots;
            return plot;
        });
    },
    // Date context for these 3 methods is the plot
    firstPlot: function() {
        console.log("first plot called");
        return this.stackIndex === 0;
    },
    offsetLeft: function (args) {
        return this.parent.attributes.left + args.hash.offset * this.stackIndex;
    },
    offsetTop: function(args) {
        return this.parent.attributes.top + args.hash.offset * this.stackIndex;
    },

    /*
     *  Manages the z-index of all of the plot divs to look
     *  stacked
    */
    stackItems: function() {
        return this.numPlots - this.stackIndex;
    }
});

Template.rack.rendered = function () {
    console.log("rack rendered!");
    // Get the div element from the template object
    // Only plots! Not subplots
    var rackDiv = this.$('.plot');
    // Store the template data in the jquery data
    rackDiv.data(this.data);
    // Save the 'this' rackObj in a variable for access in callbacks
    var rackObj = this.data;

    rackDiv.resizable({
            handles: "n, e, s, w", // only edges handles
            containment: "parent"
        }, {
            resize: function(evt, ui) {
                // Provdes live data when resizing but very resource intensive!!
                // var newAttrs = {};
                // newAttrs.top = ui.position.top;
                // newAttrs.left = ui.position.left;
                // newAttrs.width = ui.size.width;
                // newAttrs.height = ui.size.height;
                // // Update the collection
                // Racks.update({_id: rackObj._id},
                //              {$set: {attributes: newAttrs}}
                //             );
            },
            start: function(evt, ui) {

            },
            /*
             *  Save the new sizes of the plot on end of resize
            */
            stop: function(evt, ui) {
                var newAttrs = {};
                newAttrs.top = ui.position.top;
                newAttrs.left = ui.position.left;
                newAttrs.width = ui.size.width;
                newAttrs.height = ui.size.height;
                // Update the collection
                Racks.update({_id: rackObj._id},
                             {$set: {attributes: newAttrs}}
                            );
            }
        })
    .draggable({ 
        containment: "#drawing-container",
        stack: ".shape"
        }, {
        drag: function(evt, ui) {
            // console.log("draaaag");
        },
        start: function(evt, ui) {
            // console.log("start");
        },
        stop: function(evt, ui) {
            var newAttrs = {};
            newAttrs.top = ui.position.top;
            newAttrs.left = ui.position.left;
            newAttrs.width = $(this).width();
            newAttrs.height = $(this).height();
            // update in the collection
            Racks.update({_id: rackObj._id}, 
                         {$set: {attributes: newAttrs}}
                         );
        }
    })
    .droppable({
        accept: ".plot",
        activeClass: "plot-active",
        greedy: true,
        hoverClass: "plot-hovered"
        },{
        /* 
         * triggered when an acceptable drag starts dragging
         * @param evt (Event)
         * @param ui: {draggable, helper, position, offset} 
        */
        activate: function(evt, ui) {

        },
        /* triggered when an accepted draggable stops dragging
         * @param ui (Object)
         *  - draggable: jquery obj repr the draggable el
         *  - helper: jquery obj repr helper being dragged
         *  - position: current css pos of helper as {top, left}
         *  - offset: current offset pos of the helper as {top, left}
        */
        deactivate: function(evt, ui) {

        },
        /*
         *  trig when acceptable draggable is dropped on droppable
         *  based on `tolerance` option
         *  @param evt (Event)
         *  @param ui: {draggable, helper, position, offset}
        */
        drop: function(evt, ui) {
            var droppedRack = Racks.findOne({_id: ui.draggable.data('_id')});
            // @bug This will delete duplicate plot names!!
            // Combine the rack plot names
            Racks.update({_id: rackObj._id},
                        {$addToSet : { plots: {$each : droppedRack.plots} } }
                        );
            // Get rid of the old rack
            Racks.remove({_id: droppedRack._id});
        },
        /*
         *  draggable dragged out of the droppable
         *  @param ui is empty
        */
        out: function(evt, ui) {

        },
        /*
         *  accepted draggable is dragged over droppable
         *  based on `tolerance` option
         *  @param evt (Event)
         *  @param ui: {draggable, helper, position, offset}
        */
        over: function(evt, ui) {

        }

    })

};