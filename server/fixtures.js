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

if (Racks.find().count() == 0) {
    Racks.insert({
        area: 'Shopping Container 1',
        name: 'id1234',
        plots: [
            {plot: 'Plot 1'},
            {plot: 'Plot 2'},
            {plot: 'Plot 3'}
        ]
    });
}

if (Plots.find().count() == 0) {
    Plots.insert({
        area: 'Shopping Container 1',
        rack: 'id1234',
        name: 'Plot 1',
        stats: [
            {value: '74F'},
            {value: '500ppm'},
            {value: '35%'}
        ]
    });

    Plots.insert({
        area: 'Shopping Container 1',
        rack: 'id1234',
        name: 'Plot 2',
        stats: [
            {value: '75F'},
            {value: '501ppm'},
            {value: '36%'}
        ]
    });

    Plots.insert({
        area: 'Shopping Container 1',
        rack: 'id1234',
        name: 'Plot 3',
        stats: [
            {value: '71F'},
            {value: '503ppm'},
            {value: '40%'}
        ]
    });
}