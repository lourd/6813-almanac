Readings = new Meteor.Collection('readings');

Meteor.methods({
    new_reading: function(doc) {
        doc.recorded_at = new Date;
        return Readings.insert(doc);
    },
    // Make a whole lot of empty data
    readings_dummy_data: function(sensorId) {
        _.each(['humidity', 'co2', 'temperature'], function(el, i, list) {
            var min, max;
            // Make 10 test values for each 
            for (var i = 3; i > 0; i--) {
                switch (el) {
                    case 'humidity':
                        min = 0.7, max = 1.0;
                        break;
                    case 'co2':
                        min = 500.0, max = 800.0;
                        break;
                    case 'temperature':
                        min = 60.0, max = 85.0;
                        break;
                }
                var newRead = {
                    sensorId: sensorId,
                    type: el,
                    value: Math.random() * (max - min) + min,
                    recorded_at: new Date(2014,4,8,13,5*i,30)
                };
                Readings.insert(newRead);
            };
        });
    }
})
// Readings.allow({
//     insert: function (userId, doc) {
//         //...
//     },
//     update: function (userId, doc, fields, modifier) {
//         //...
//     },
//     remove: function (userId, doc) {
//         //...
//     },
//     fetch: ['owner'],
//     transform: function () {
//         //...
//     }
// });

// Readings.deny({
//     insert: function (userId, doc) {
//         //...
//     },
//     update: function (userId, doc, fields, modifier) {
//         //...
//     },
//     remove: function (userId, doc) {
//         //...
//     },
//     fetch: ['locked'],
//     transform: function () {
//         //...
//     }
// });