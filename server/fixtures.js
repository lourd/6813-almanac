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
    var rck1id = Racks.insert({
        areaId: shipContId,
        name: 'Rack 1',
        attributes: {position: "absolute", top: "35px", left: "57px", width: "367px", height: "148px"},
        plots: [
            {plot: 'Plot 1'},
            {plot: 'Plot 2'},
            {plot: 'Plot 3'},
            {plot: 'Plot 7'}
        ]
    });

    var rck2id = Racks.insert({
        areaId: vtGreenhouseId,
        name: 'Rack 2',
        plots: [
            {plot: 'Plot 4'},
            {plot: 'Plot 5'},
            {plot: 'Plot 6'}
        ]
    })
}

if (Plots.find().count() === 0) {
    Plots.insert({
        areaId: shipContId,
        rackId: rck1id,
        name: 'Plot 1',
        stats: [
            {value: '71F'},
            {value: '550ppm'},
            {value: '40%'}
        ]
    });

    Plots.insert({
        areaId: shipContId,
        rackId: rck1id,
        name: 'Plot 2',
        stats: [
            {value: '75F'},
            {value: '500ppm'},
            {value: '35%'}
        ]       
    });

    Plots.insert({
        areaId: shipContId,
        rackId: rck1id,
        name: 'Plot 3',
        stats: [
            {value: '80F'},
            {value: '600ppm'},
            {value: '25%'}
        ]       
    });
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