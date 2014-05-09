////////////////////////
// Dummy area data
////////////////////////
if (Areas.find().count() === 0) {
    
    var coGrowId = Areas.insert({
        name: 'Colorado Grow Op',
        location: 'Boulder, CO'
    });

    var shipContId = Areas.insert({
        name: 'Shipping Container 1',
        location: 'Hopkinton, MA'
    });

    var vtGreenhouseId = Areas.insert({
        name: 'Vermont Greenhouse',
        location: 'Burlington, VT'
    });

}

////////////////////////
// Dummy Rack data
////////////////////////
if (Racks.find().count() == 0) {

    var co_rack1 = Racks.insert({
        areaId: coGrowId,
        name: 'Rack 1',
        attributes: {top: 40, left: 53, width: 464, height: 80}
    });

    var co_rack2 = Racks.insert({
        areaId: coGrowId,
        name: 'Rack 2',
        attributes: {top: 40, left: 531, height: 421, width: 173}
    });

    // Single plot example
    var co_rack3 = Racks.insert({
        areaId: coGrowId,
        name: 'Plot 6',
        attributes: {top: 300, left: 53, width: 464, height: 80}
    });

    var shipRack1 = Racks.insert({
        areaId: shipContId,
        name: 'Rack 1',
        attributes: {top: 35, left: 57, width: 367, height: 148}
    });

    var vermontRack1 = Racks.insert({
        areaId: vtGreenhouseId,
        name: 'Rack 2'
    })
}

////////////////////////
// Dummy Plot data
////////////////////////
if (Plots.find().count() === 0) {

    // 3 plots for Colorado rack 1
    Plots.insert({
        areaId: coGrowId,
        rackId: co_rack1,
        name: 'Plot 1',
        stackIndex: 0
    });

    Plots.insert({
        areaId: coGrowId,
        rackId: co_rack1,
        name: 'Plot 2',
        stackIndex: 1,
    });

    Plots.insert({
        areaId: coGrowId,
        rackId: co_rack1,
        name: 'Plot 3',
        stackIndex: 2
    })

    // 2 plots for CO rack 2
    Plots.insert({
        areaId: coGrowId,
        rackId: co_rack2,
        name: 'Plot 4',
        stackIndex: 0
    });

    Plots.insert({
        areaId: coGrowId,
        rackId: co_rack2,
        name: 'Plot 5',
        stackIndex: 1
    });

    // 1 plot for CO rack 3
    Plots.insert({
        areaId: coGrowId,
        rackId: co_rack3,
        name: 'Plot 6',
        stackIndex: 0
    })


    Plots.insert({
        areaId: shipContId,
        rackId: shipRack1,
        name: 'Plot 1',
        stackIndex: 0
    });

    Plots.insert({
        areaId: shipContId,
        rackId: shipRack1,
        name: 'Plot 2',
        stackIndex: 1  
    });

    Plots.insert({
        areaId: shipContId,
        rackId: shipRack1,
        name: 'Plot 3',
        stackIndex: 0
    });
}

////////////////////////
// Dummy Sensors data
////////////////////////

// Ideally sensors should support belonging to plots, racks, or areas
// We're starting out with just belonging to areas
if (Sensors.find().count() == 0) {

    var coSensor1 = Sensors.insert({
        zoneType: 'area', // this is just area for now, support more later
        zoneId: coGrowId, 
        name: 'Air Sensor 1',
        type: 'air',
        attributes: {top: 200, left: 200}
    });

    var coSensor = Sensors.insert({
        zoneType: 'area',
        zoneId: coGrowId,
        name: 'Air Sensor 2',
        type: 'air',
        attributes: {top: 200, left: 300}
    });
}

////////////////////////
// Dummy Readings data
////////////////////////

if (Readings.find().count() == 0) {

    Readings.insert({
        sensorId: coSensor1,
        type: 'humidity',
        value: 0.91,
        recorded_at: new Date(2014,4,8,13,1,13)
    });
    Readings.insert({
        sensorId: coSensor1,
        type: 'humidity',
        value: 0.88,
        recorded_at: new Date(2014,4,8,13,42,11)
    });
    Readings.insert({
        sensorId: coSensor1,
        type: 'humidity',
        value: 0.85,
        recorded_at: new Date(2014,4,8,13,54,48)
    });

    Readings.insert({
        sensorId: coSensor1,
        type: 'temperature',
        value: 73.2,
        recorded_at: new Date(2014,4,8,13,3,13)
    });
    Readings.insert({
        sensorId: coSensor1,
        type: 'temperature',
        value: 74.9,
        recorded_at: new Date(2014,4,8,13,35,33)
    });
    Readings.insert({
        sensorId: coSensor1,
        type: 'temperature',
        value: 75.2,
        recorded_at: new Date(2014,4,8,13,48,53)
    });

    Readings.insert({
        sensorId: coSensor1,
        type: 'co2',
        value: 654.0,
        recorded_at: new Date(2014,4,8,13,5,1)
    });
    Readings.insert({
        sensorId: coSensor1,
        type: 'co2',
        value: 623.0,
        recorded_at: new Date(2014,4,8,13,20,43)
    });
    Readings.insert({
        sensorId: coSensor1,
        type: 'co2',
        value: 614.0,
        recorded_at: new Date(2014,4,8,13,51,23)
    });
}