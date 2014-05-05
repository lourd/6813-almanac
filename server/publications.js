Meteor.publish('areas', function() {
    return Areas.find();
});

Meteor.publish('singleArea', function(id) {
    return id && Areas.find(id);
})

Meteor.publish('racks', function(id) {
	return Racks.find({areaId: id});
});