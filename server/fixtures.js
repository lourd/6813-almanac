////////////////////////
// Dummy area data
////////////////////////
if (Areas.find().count() === 0) {
    var shipContId = Areas.insert({
        name: 'Shipping Container 1',
        location: 'Hopkinton, MA',
        stats: [
            {value: '72F'},
            {value: '494ppm'},
            {value: '34%'}
        ]
    });

    var vtGreenhouseId = Areas.insert({
        name: 'Vermont Greenhouse',
        location: 'Burlington, VT',
        stats: [
            {value: '72F'},
            {value: '494ppm'},
            {value: '34%'}
        ]
    });

    var coGrowId = Areas.insert({
        name: 'Colorado Grow Op',
        location: 'Boulder, CO',
        stats: [
            {value: '72F'},
            {value: '494ppm'},
            {value: '34%'}
        ]
    });
}

////////////////////////
// Dummy Rack data
////////////////////////
if (Racks.find().count() == 0) {
    Racks.insert({
        areaId: shipContId,
        name: 'Rack 1',
        plots: [
            {plot: 'Plot 1'},
            {plot: 'Plot 2'},
            {plot: 'Plot 3'}
        ]
    });

    Racks.insert({
        areaId: vtGreenhouseId,
        name: 'Rack 2',
        plots: [
            {plot: 'Plot 4'},
            {plot: 'Plot 5'},
            {plot: 'Plot 6'}
        ]
    })
}

// Ideally sensors should support belonging to plots, racks, or areas
// We're starting out with just belonging to areas
// if (Sensors.find().count() == 0) {
//     Sensors.insert({
//         scopeId: /*areaId*/, // this is just area for now, support more later
//         name: 'Air Sensor 1',
//         type: /*air water*/,
//         updated_at: /*time*/,
//         last_value: /*a sensor reading*/
//     })
// }

// if (Readings.find().count() == 0) {
//     Readings.insert({
//         sensorId: /*id*/,
//         type: /*humidity, temperature, co2*/,
//         value: /*float*/
//         created_at: /*time*/
//     });
// }