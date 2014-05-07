Template.graph.helpers({
	graphType: function() {
		return Session.get('graphType');
	}
});

Template.graph.rendered = function() {
	console.log("graph rendered");
}