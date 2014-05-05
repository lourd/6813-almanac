Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [Meteor.subscribe('areas'), Meteor.subscribe('posts')];
    }
});

Router.map(function() {
    this.route('areasList', {path: '/'});

    this.route('areaLayoutPage', {
        path: '/areas/:_id',
        data: function() { return Areas.findOne(this.params._id); }
    });

    this.route('rackPage', {
        path: '/areas/areaID/:rack',
        data: function() { 
            return Plots.find({rack: 'id1234'});}
    });


})

Router.onBeforeAction('loading');