if (Areas.find().count() === 0) {
    Areas.insert({
        name: 'Shipping Container 1',
        location: 'Hopkinton, MA',
        stats: [
            {value: '72F'},
            {value: '494ppm'},
            {value: '34%'}
        ]
    });

    Areas.insert({
        name: 'Vermont Greenhouse',
        location: 'Burlington, VT',
        stats: [
            {value: '72F'},
            {value: '494ppm'},
            {value: '34%'}
        ]
    });

    Areas.insert({
        name: 'Colorado Grow Op',
        location: 'Boulder, CO',
        stats: [
            {value: '72F'},
            {value: '494ppm'},
            {value: '34%'}
        ]
    });
}