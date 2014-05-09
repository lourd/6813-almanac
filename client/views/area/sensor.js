Template.sensor.rendered = function () {
    var sensorDiv = this.$('.sensor');
    var sensorObj = this.data;

    sensorDiv.draggable({ 
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
            // update in the collection
            Sensors.update({_id: sensorObj._id}, 
                         {$set: {attributes: newAttrs}}
                         );
        }
    })
};