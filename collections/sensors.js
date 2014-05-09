Sensors = new Meteor.Collection('sensors');

Meteor.methods({
    new_sensor: function(sensorArgs) {

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