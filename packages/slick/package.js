Package.describe({
    summary: "(jQuery plugin) The last carousel you'll ever need"
});

Package.on_use(function (api) {
    api.use(['jquery']);
    api.add_files([
        'lib/slick/slick/slick.js',
        'lib/slick/slick/slick.css',
        'lib/slick/slick/fonts/slick.eot',
        'lib/slick/slick/fonts/slick.svg',
        'lib/slick/slick/fonts/slick.ttf',
        'lib/slick/slick/fonts/slick.woff',
        'lib/slick/slick/ajax-loader.gif'
        ], 'client');
});

Package.on_test(function(api) {
    api.use('jquery', 'client');
    api.use(['tinytest', 'test-helpers'], 'client');

    api.add_files('slick_tests.js', 'client');
});