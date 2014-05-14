Areas = new Meteor.Collection('areas');

Meteor.methods({
    newArea: function (doc) {
        return Areas.insert(doc);
    }
});