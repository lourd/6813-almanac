Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [Meteor.subscribe('areas')];
    }
});

Router.map(function() {
    this.route('areasPage', {path: '/'});

    this.route('areaPage', {
        path: '/areas/:_id',
        data: function() { return Areas.findOne(this.params._id); }
    });

    this.route('rackPage'), {
        path: '/racks/:_id',
        data: function() { return Racks.findOne(this.params._id); }
    }
})

Router.onBeforeAction('loading');
