// publishing all areas because there are no accounts right now
Meteor.publish('areas', function() {
    return Areas.find();
});

Meteor.publish('singleArea', function(id) {
    return id && Areas.find(id);
})

// All of the racks belonging to an area
Meteor.publish('areaRacks', function(rack_area_id) {
	return Racks.find({areaId: rack_area_id});
});

Meteor.publish('singleRack', function(id) {
    return id && Racks.find(id);
});

// All of the plots belonging to an area
Meteor.publish('areaPlots', function(plot_area_id) {
	return Plots.find({areaId: plot_area_id});
});

// Plots belonging to a rack
Meteor.publish('rackPlots', function(rack_plot_id) {
    return Plots.find({rackId: rack_plot_id});
});

// All of the sensors belonging to an area
Meteor.publish('areaSensors', function(sensor_area_id) {
    return Plots.find({areaId: sensor_area_id});
})