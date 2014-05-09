Template.quickStats.rendered = function() {

	testDB = function() {
		var plots = Plots.find();
		console.log(plots.count());
		for (plot in plots) {
			console.log(plot._id);
		}
	};
}


Template.quickStats.helpers({
	moreStats: function(givenType) {
		var readings = []
		Sensors.find().forEach(function(s) {
			var sId = s._id;
			var sensorName = Sensors.findOne({_id:sId}).name;

			var latestReading = Readings.findOne({
				$and: [
					{sensorId:sId},
					{type: givenType}]
				},{sort: {recorded_at:1}}).value;

			readings.push({
				reading: (latestReading).toFixed(2),
				sname: sensorName
			});
		});
		return readings;
	},
	stats: function() {
		//Finding out the number of different types of stats
		//Meteor Collections does not have 'distinct' method yet
		var array = Readings.find().fetch();
		var distinctArray = _.uniq(array, false, function(d) {
			return d.type
		});
		var distinctValues = _.pluck(distinctArray, 'type');

		//Put it into an array to pass to the template
		var outputArray = [];
		for (var i=0; i<distinctValues.length;i++) {
			var latestAverage = 0;
			Sensors.find().forEach(function(s) {
				var sId = s._id;
				var numOfSensors = Sensors.find().count();

				var latestReading = Readings.findOne({
					$and: [
						{sensorId:sId},
						{type: distinctValues[i]}]
					},{sort: {recorded_at:1}}).value;

				latestAverage += latestReading/numOfSensors;
			});
			outputArray.push({
				name: distinctValues[i],
				value: (latestAverage).toFixed(2)
			});
		}

		return outputArray;
	}
});

Template.quickStats.events({
	'click .graph-toggle' : function(e) {
		// 'this' is the variable button you click on
		var type = this.name;
		Session.set('graphPlot', Template.rackPage.getCurrentPlotIndex());
		Session.set('graphType', type);
	}
})
