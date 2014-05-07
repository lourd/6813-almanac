var SUBPLOT_OFFSET_X = 7;
var SUBPLOT_OFFSET_Y = SUBPLOT_OFFSET_X;

Template.rack.helpers({
    plotsWithIndex: function () {
        var plots = this.plots;
        for( var i = 0; i<plots.length; i++) {
            plots[i].index = i;
            plots[i].parent = this;
        }
        testp = plots[0];
        return plots
    },
    firstPlot: function() {
        return this.index === 0;
    },
    offsetLeft: function (delta) {
        return this.parent.attributes.left + SUBPLOT_OFFSET_X * this.index;
    },
    offsetTop: function(delta) {
        return this.parent.attributes.top + SUBPLOT_OFFSET_Y * this.index;
    },

    /*
     *  Manages the z-index of all of the plot divs to look
     *  stacked
    */
    stackItems: function() {
        return this.parent.plots.length - this.index;
    }
});

Template.rack.rendered = function () {
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
            console.log("dropped rack");
            var droppedRack = Racks.findOne({_id: ui.draggable.data('_id')});
            console.log(droppedRack);
            console.log("dropped on rack");
            console.log(rackObj);
            // @bug This will delete duplicate plot names!!
            // Combine the rack plot names
            Racks.update({_id: rackObj._id},
                        {$addToSet : { plots: {$each : droppedRack.plots} } }
                        );
            console.log("dropped on rack updated");
            console.log(Racks.findOne({_id: rackObj._id}));
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