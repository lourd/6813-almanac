Package.describe({
    summary: "(jQuery plugin) The last carousel you'll ever need"
});

Package.on_use(function (api) {
    api.use(['jquery']);
    api.add_files([
        'lib/slick.js',
        'lib/slick.css',
        'lib/fonts/slick.eot',
        'lib/fonts/slick.svg',
        'lib/fonts/slick.ttf',
        'lib/fonts/slick.woff',
        'lib/ajax-loader.gif'
        ], 'client');
});

Package.on_test(function(api) {
    api.use('jquery', 'client');
    api.use(['tinytest', 'test-helpers'], 'client');

    api.add_files('slick_tests.js', 'client');
});