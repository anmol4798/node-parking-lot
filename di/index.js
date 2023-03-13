const { createContainer, asValue } = require('awilix');
const container = new createContainer();
    // Foundation
// const config = require('../config');
// const model = require('../model');
const utility = require('../utility');

container.register({
    // config: asValue(config),
    utility: asValue(utility),
    // model: asValue(model)
});

// -------------------------------------------------------------- //
// Repo layer
const RedisRepo = require('../repository/database/redisRepo.js');
const redisRepo = new RedisRepo();

container.register('redisRepo', asValue(redisRepo));

// -------------------------------------------------------------- //
// Logic layer
const ParkingLogic = require('../logic/parking.js');
const parkingLogic = new ParkingLogic(container);

container.register('parkingLogic', asValue(parkingLogic));

// -------------------------------------------------------------- //
// API layer
const CreateParkingApi = require('../api/v1/parking/create.js');
const createParkingApi = new CreateParkingApi(container);

container.register('createParkingApi', asValue(createParkingApi));

const UpdateParkingApi = require('../api/v1/parking/update.js');
const updateParkingApi = new UpdateParkingApi(container);

container.register('updateParkingApi', asValue(updateParkingApi));

const DeleteParkingApi = require('../api/v1/parking/delete.js');
const deleteParkingApi = new DeleteParkingApi(container);

container.register('deleteParkingApi', asValue(deleteParkingApi));

const ReadParkingApi = require('../api/v1/parking/read.js');
const readParkingApi = new ReadParkingApi(container);

container.register('readParkingApi', asValue(readParkingApi));



module.exports = container;