Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});

Router.map(function() {
    this.route('areasPage', {
        path: '/',
        waitOn: function() {
            return [
                Meteor.subscribe('areas')
            ]
        }
    });

    this.route('areaPage', {
        path: '/areas/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('singleArea', this.params._id),
                Meteor.subscribe('racks', this.params._id)
            ]
        },
        data: function() { return Areas.findOne(this.params._id); }
    });

    this.route('rackPage', {
        path: '/racks/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('singleRack', this.params._id)
            ]
        },
        data: function() { 
            return Racks.findOne(this.params._id);
        }
    });
});

Router.onBeforeAction('loading');