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

	$("#stats-container").selectable({
		selected: function(event, ui) {
			var text = $(ui.selected).children()[0].innerHTML;

			Session.set('graphPlot', Session.get('currentPlot'));
			Session.set('graphType', text);
		},

		unselected: function(event, ui) {

		}
	});

	$(".ui-selectee").mouseover(function() {
		var child = $(this).children()[0];
		if (child != undefined) {
			//Add some color changing function so there is
			//affordance (so we know buttons can be clicked)
			var text = child.innerHTML;
		}		
	});

	$(".ui-selectee").hover(
		function() {
			//$(this).css('background', 'red');
		}, function() {
			//$(this).css('background', 'white');
	});
}


Template.quickStats.helpers({
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
				console.log(latestReading);
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
