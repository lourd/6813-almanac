Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.map(function() {

    this.route('homePage', {
        path: '/'
    });
    
    this.route('areasPage', {
        path: '/schrute-farms',
        waitOn: function() {
            return [
                Meteor.subscribe('areas')
            ]
        }
    });

    this.route('areaPage', {
        path: '/schrute-farms/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('singleArea', this.params._id),
                Meteor.subscribe('areaRacks', this.params._id),
                Meteor.subscribe('areaPlots', this.params._id),
                Meteor.subscribe('areaSensors', this.params._id)
            ]
        },
        data: function() { return Areas.findOne(this.params._id); }
    });

    this.route('rackPage', {
        path: '/schrute-farms/:areaId/:rackId',
        waitOn: function() {
            return [
                Meteor.subscribe('singleArea', this.params.areaId),
                Meteor.subscribe('singleRack', this.params.rackId),
                Meteor.subscribe('rackPlots', this.params.rackId),
                Meteor.subscribe('areaSensors', this.params.areaId),
                Meteor.subscribe('areaReadings')
                // Meteor.subscribe('readingsByArea', this.params.areaId)
                // sensors by rack
                // sensors by areaa
            ]
        },
        data: function() { 
            return Racks.findOne(this.params.rackId);
        }
    });
});

Router.onBeforeAction('loading');