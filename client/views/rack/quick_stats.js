Template.quickStats.rendered = function() {

	$(".stat-details").hide();

	// this function toggles showing the details for area's sensor information
	$(".stat-details-button").click(function() {
		if ($(".stat-details-button").val() === '+') {
			$(".stat-details").show();
			$(".stat-details-button").val("-");
		}
		else {
			$(".stat-details").hide();
			$(".stat-details-button").val('+');
		}
	});
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

			readings.push([
				{reading: latestReading},
				{sname: sensorName}
			]);
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
		var outPutArray = [];
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
			outPutArray.push({
				name: distinctValues[i],
				value: latestAverage
			});
		}

		return outPutArray;
	}
});

Template.quickStats.events({
	'click .accordion-toggle' : function(e) {
		var type = this.name;
		Session.set('graphPlot', Session.get('currentPlot'));
		Session.set('graphType', type);
	}
})

