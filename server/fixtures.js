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

    var co_rack1 = Racks.insert({
        areaId: coGrowId,
        name: 'Rack 1',
        attributes: {top: 40, left: 53, width: 464, height: 80},
        plots: [
            {plot: 'Plot 1'},
            {plot: 'Plot 2'},
            {plot: 'Plot 3'}
        ]
    });

    var co_rack2 = Racks.insert({
        areaId: coGrowId,
        name: 'Rack 2',
        attributes: {top: 40, left: 531, height: 421, width: 173},
        plots: [
            {plot: 'Plot 4'},
            {plot: 'Plot 5'}
        ]
    });

    var co_rack3 = Racks.insert({
        areaId: coGrowId,
        name: 'Plot 3',
        attributes: {top: 300, left: 53, width: 464, height: 80},
        plots: [
            {plot: 'Plot 6'}
        ]
    });

    var rck1id = Racks.insert({
        areaId: shipContId,
        name: 'Rack 1',
        attributes: {top: 35, left: 57, width: 367, height: 148},
        plots: [
            {plot: 'Plot 1'},
            {plot: 'Plot 2'},
            {plot: 'Plot 3'},
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
            {name: 'Temperature', value: 71, units: 'F'},
            {name: 'CO2', value: 550, units: 'ppm'},
            {name: 'Humidity', value: 40, units: '%'}
        ]
    });

    Plots.insert({
        areaId: shipContId,
        rackId: rck1id,
        name: 'Plot 2',
        stats: [
            {name: 'Temperature', value: 75, units: 'F'},
            {name: 'CO2', value: 500, units: 'ppm'},
            {name: 'Humidity', value: 35, units: '%'}
        ]       
    });

    Plots.insert({
        areaId: shipContId,
        rackId: rck1id,
        name: 'Plot 3',
        stats: [
            {name: 'Temperature', value: 80, units: 'F'},
            {name: 'CO2', value: 600, units: 'ppm'},
            {name: 'Humidity', value: 25, units: '%'}
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