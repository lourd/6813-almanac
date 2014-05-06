Template.areaPage.helpers({

    racks: function() {
        return Racks.find({areaId: this._id});
    },

    addRect: function() {
        
    },

    // Add a circle to the raphael paper
    addCircle: function() {
        var circle = paper.circle(x, y, radius)
                    .attr('cursor', 'move')
                    // Need to fill to make it draggable!
                    .attr('fill', fill)
                    // Always want sensors at the front
                    .toFront();
        circle.hover(
            function(evt) {
                console.log(this);
                $("#popup").css({
                    left: this.getBBox().x + 220 + this.getBBox().height/2
                    , top: this.getBBox().y + 100 + this.getBBox().height/2
                }).show();
            }
            , function(evt) {
                $("#popup").hide();
            });
        var ft = paper.freeTransform(circle, {
            scale: false
            , rotate: false
            , drag: 'self'
            , boundary: {
                x: 50
                , y: 50
                , width: 500
                , height: 500
            }
        });

        ft.hideHandles({undrag: false});
        return ft;
    },

    // Save the contents of the raphael Paper
    saveLayout: function() {

    },

    // Load the contents of the layoutJSON object to the paper
    loadLayout: function() {

    }

});

Template.areaPage.events({
    'click .drawing-action.add': function (e) {
        console.log("plot created");
        var newRack = Racks.insert({
            areaId: this._id,
            name: 'change this RACK NAME',
            plots: [
                {plot: 'change this PLOT NAME'}
            ]
        });
        rackView = $(document.createElement("div"));
        rackView.addClass('shape plot');
        $('#drawing-container').append(rackView);
        rackView.freetrans();
    },

    'click .drawing-action.remove': function (e) {
        console.log("remove clicked");
    }
});