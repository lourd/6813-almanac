Package.describe({
    summary: "(jQuery plugin) Simple controls to move/rotate/scale a div"
});

Package.on_use( function (api) {
    api.use(['jquery']);
    api.add_files([
        'lib/jquery-free-transform/js/Matrix.js',
        'lib/jquery-free-transform/js/jquery.freetrans.js',
        'lib/jquery-free-transform/css/jquery.freetrans.css',
        'lib/jquery-free-transform/css/rotate_ccw.png'
        ], 'client');
});

Package.on_test( function(api) {
    api.use('jquery', 'client');
    api.use(['tinytest', 'test-helpers'], 'client');

    api.add_files('jquery_ft_tests.js', 'client');
})