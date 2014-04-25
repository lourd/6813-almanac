Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('areas');
    }
});

Router.map(function() {
    this.route('areasList', {path: '/'});

    this.route('areaLayoutPage', {
        path: '/areas/:_id',
        data: function() { return Areas.findOne(this.params._id); }
    });
})

Router.onBeforeAction('loading');