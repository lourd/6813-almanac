var DRAWING_HEIGHT = 500;
var DRAWING_WIDTH = 770;

Template.areaPage.helpers({

    racks: function() {
        return Racks.find({areaId: this._id});
    },
    
    // Add a rectangle to the raphael Paper canvas
    addRect: function(paper, x, y, width, height, fill) {
        var rect = paper.rect(x, y, width, height)
            .attr('fill', fill)
            .attr('cursor', 'move')
            .attr('href', '/')
            .attr('text', 'Plot 1')
            // .attr('text-anchor', 'middle')
            // Always want plots at the back
            .toBack();
        console.log("rect");
        console.log(rect);

        var ft = paper.freeTransform(rect, {
            scale: ['bboxCorners']
            , rotate: false
            , drag: 'self'
            , draw: ['bbox']
            , boundary: {
                x: 25
                , y: 25
                , width: DRAWING_WIDTH
                , height: DRAWING_HEIGHT
            }
        });
        ft.subject.mouseover( function(evt) {
            ft.showHandles();
        });

        ft.handles.bbox[0].element.attr("cursor","pointer");
        ft.handles.bbox[1].element.attr("cursor","pointer");
        ft.handles.bbox[2].element.attr("cursor","pointer");
        ft.handles.bbox[3].element.attr("cursor","pointer");
        ft.hideHandles({undrag: false});
        return ft;
    },

    // Add a circle to the raphael paper
    addCircle: function(paper, x, y, radius, fill, obj) {
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
    saveLayout: function(paper) {
        json = paper.toJSON(function(el, data) {
            // ALL items need to have freeTransform added in order
            // to save correctly
            if ( el.freeTransform != null) {
                data.ft = {};
                data.ft.attrs = el.freeTransform.attrs;
                data.ft.opts = el.freeTransform.opts;
            }
            return data;
        });
        return json;
    },


    // Load the contents of the layoutJSON object to the paper
    loadLayout: function(layoutJSON, paper) {
        paper.clear();
        paper.fromJSON(layoutJSON, function(el, data) {
            if ( data.ft && data.ft.attrs) {
                paper.freeTransform(el);
                el.freeTransform.attrs = data.ft.attrs;
                if (data.ft.opts) {
                    el.freeTransform.setOpts(data.ft.opts);
                }
                el.freeTransform.apply();
                return el;
            } else {
                // Must remove it or ghosted elements
                // e.g. bounding box remain on page
                el.remove();
            }
        });
    }

});

Template.areaPage.rendered = function () {
    
    paper = Raphael("drawing-container", DRAWING_WIDTH, DRAWING_HEIGHT);

    $('#save').click( function () {
        json = saveLayout(paper);
    });

    $('#load').click( function () {
        if (json) { // Make sure save data exists
            loadLayout(json, paper);
        }
    });

    $('#add-sensor').click( function () {
        addCircle(paper, 250, 250, 10, 'gray');
    });


};

Template.areaPage.events({
    'click .drawing-action.add': function (e) {
        e.preventDefault();
        // console.log("add plot");
        var plot = Template.areaPage.addRect(paper, 50, 50, 50, 50, 'green');
        
    },

    'click .drawing-action.remove': function (e) {
        e.preventDefault();

        paper.clear();
    },

    'click svg': function (e) {
        var clickedElement = paper.getElementByPoint(e.clientX, e.clientY);
        if (! clickedElement) {
            // console.log("svg!");
            e.preventDefault();
        }
    }
});