Sensors = new Meteor.Collection('sensors');

var DEFAULT_SENSOR_X = 250;
var DEFAULT_SENSOR_Y = 250;
var DEFAULT_SENSOR_TYPE = 'air';

Meteor.methods({
    new_sensor: function(doc) {
        var defaultAttrs = {
            top: DEFAULT_SENSOR_Y,
            left: DEFAULT_SENSOR_X
        };
        var defaultName = "Air Sensor " + _.random(1000);
        doc.attributes = defaultAttrs;
        doc.name = defaultName;
        return Sensors.insert(doc);
    },
    remove_sensor: function(sensorId) {
        return Sensors.remove(sensorId);
    }
})
// Sensors.allow({
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

// Sensors.deny({
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