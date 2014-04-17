var DRAWING_HEIGHT = 1000;
var DRAWING_WIDTH = 500;

var addRect = function(paper, x, y, width, height, fill) {
    var rect = paper.rect(x, y, width, height)
        .attr('fill', fill)
        .attr('cursor', 'move')
        // Always want plots at the back
        .toBack();

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
    ft.subject.mouseup( function(evt) {
        ft.showHandles();
    });

    ft.handles.bbox[0].element.attr("cursor","pointer");
    ft.handles.bbox[1].element.attr("cursor","pointer");
    ft.handles.bbox[2].element.attr("cursor","pointer");
    ft.handles.bbox[3].element.attr("cursor","pointer");
    ft.hideHandles({undrag: false});
}

var addCircle = function(paper, x, y, radius, fill, obj) {
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
}

var loadLayout = function(layoutJSON, paper) {
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

var saveLayout = function(paper) {
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
}

$(function () {

    var paper = Raphael("drawing-container", DRAWING_HEIGHT, DRAWING_WIDTH);
    var json;
    var selectedElement;

    $('#save').click( function () {
        json = saveLayout(paper);
    });

    $('#load').click( function () {
        if (json) { // Make sure save data exists
            loadLayout(json, paper);
        }
    });

    $('#clear-layout').click( function () {
        paper.clear();
    });

    $('#add-plot').click( function () {
        addRect(paper, 50, 50, 50, 50, 'green');
    });

    // $('#add-sensor').click( function () {
    //     addCircle(paper, 250, 250, 10, 'gray');
    // });

    // Background click handler
    $('svg').click( function(evt) {
        var clickedElement = paper.getElementByPoint(evt.clientX, evt.clientY);
        if (! clickedElement) {
            console.log("null event");
            evt.stopPropagation();
        }
        // paper.forEach( function(el) {
        //     if ( el.freeTransform != null) {
        //         el.freeTransform.hideHandles();
        //         el.attr('cursor','pointer');
        //     }
        // });
    });

    drop = new Drop({
        target: document.querySelector('#add-sensor')
        , content: "You added a sensor!"
        , position: "right middle"
        , openOn: 'click'
    });

    console.log(drop);


});


