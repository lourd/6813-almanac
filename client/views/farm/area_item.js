Template.areaItem.helpers({
    stats: function() {
        return this.stats;
    }
});

Template.addArea.events({
    'click button': function (evt) {
        evt.preventDefault();
        var area = {
            name: $('#farm-name-input').val(),
            location: $('#farm-location-input').val()
        }
        debugger
        Meteor.call('newArea', area, function(error, id) {
            // error handling!
        })
    }
});