// publishing all areas because there are no accounts right now
Meteor.publish('areas', function() {
    return Areas.find();
});

Meteor.publish('singleArea', function(id) {
    return id && Areas.find(id);
});

// All of the racks belonging to an area
Meteor.publish('areaRacks', function(rack_area_id) {
	return Racks.find({areaId: rack_area_id});
});

Meteor.publish('singleRack', function(id) {
    return id && Racks.find(id);
});

// All of the plots belonging to an area
Meteor.publish('areaPlots', function(areaId) {
	return Plots.find({areaId: areaId});
});

// Plots belonging to a rack
Meteor.publish('rackPlots', function(rackId) {
    return Plots.find({rackId: rackId});
});

// All of the sensors belonging to an area
Meteor.publish('areaSensors', function(areaId) {
    return Sensors.find({zoneId: areaId});
});

// Publist all readings for now
Meteor.publish('areaReadings', function() {
	return Readings.find();
})

//
// Meteor.publish('readingsByArea', function(areaId) {
//     var sensors = Sensors.find({areaId: areaId});
    
// })