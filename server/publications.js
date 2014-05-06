Meteor.publish('areas', function() {
    return Areas.find();
});

Meteor.publish('singleArea', function(id) {
    return id && Areas.find(id);
})

Meteor.publish('racks', function(id) {
	return Racks.find({areaId: id});
});

Meteor.publish('singleRack', function(id) {
    return id && Racks.find(id);
});


//Plots collection
Meteor.publish('plots', function() {
	return Plots.find();
});