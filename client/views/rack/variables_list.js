Template.variablesList.helpers({
	/*
	 *	Return an array of [<latest reading>, <sensor name>]
	*/
	moreStats: function(givenType) {
		var readings = []
		Sensors.find().forEach(function(s) {
			var sId = s._id;
			var sensorName = s.name;
			// Get the most recent value for givenType of the sensor
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
	/*
	 *	Return an array of [<variable type>, <average of last values>]
	*/
	stats: function() {
		// Finding out the number of different types of stats
		// Meteor Collections does not have 'distinct' method yet
		var array = Readings.find().fetch();
		var distinctArray = _.uniq(array, false, function(d) {
			return d.type
		});
		var distinctValues = _.pluck(distinctArray, 'type');

		// Put it into an array to pass to the template
		var outputArray = [];
		// Get the most recent values of each type
		for (var i=0; i<distinctValues.length;i++) {
			var latestAverage = 0;
			// From each sensor
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
			// Save the averages
			outputArray.push({
				type: distinctValues[i],
				value: (latestAverage).toFixed(2)
			});
		}

		return outputArray;
	}
});

Template.variablesList.events({
	'click .graph-toggle' : function(e) {
		// 'this' is each stat returned in the stats helper
		// Set the session variable to the current plot index
		Session.set('slideIsGraph', Template.rackPage.getCurrentPlotIndex());
		Session.set('graphType', this.type);
		Deps.flush();
		console.log("flush...");
	}
})
