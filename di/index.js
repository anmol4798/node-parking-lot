const { createContainer, asValue } = require('awilix');
const container = new createContainer();
const utility = require('../utility');

container.register({
    utility: asValue(utility)
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

const TicketLogic = require('../logic/ticket.js');
const ticketLogic = new TicketLogic(container);

container.register('ticketLogic', asValue(ticketLogic));

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

const CreateTicketApi = require('../api/v1/ticket/create.js');
const createTicketApi = new CreateTicketApi(container);

container.register('createTicketApi', asValue(createTicketApi));

const UpdateTicketApi = require('../api/v1/ticket/update.js');
const updateTicketApi = new UpdateTicketApi(container);

container.register('updateTicketApi', asValue(updateTicketApi));

const DeleteTicketApi = require('../api/v1/ticket/delete.js');
const deleteTicketApi = new DeleteTicketApi(container);

container.register('deleteTicketApi', asValue(deleteTicketApi));

const ReadTicketApi = require('../api/v1/ticket/read.js');
const readTicketApi = new ReadTicketApi(container);

container.register('readTicketApi', asValue(readTicketApi));

const SettleTicketApi = require('../api/v1/ticket/settle.js');
const settleTicketApi = new SettleTicketApi(container);

container.register('settleTicketApi', asValue(settleTicketApi));


module.exports = container;