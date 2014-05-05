Meteor.publish('areas', function() {
    return Areas.find();
});

Meteor.publish('racks', function() {
	return Racks.find();
});

Meteor.publish('posts', function() {
	return Plots.find();
});