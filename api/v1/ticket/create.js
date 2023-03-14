const _ = require('lodash');
const { v4: uuid } = require('uuid');

class CreateTicket {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.ticketLogic = container.resolve('ticketLogic');
    }

    async handleRequest(req, res) {
        const payload = _.get(req, 'body', {});
        const parkingId = _.get(payload, 'parkingId', null);
        // validate input here
        const ticketId = uuid();
        const [createErr, ] = await this.utility.invoker(this.ticketLogic.createOrUpdate(payload, ticketId, parkingId, 'create'));

        if (createErr) {
            return res.status(400).json({
                data: null,
                message: 'Ticket could not be created'
            });
        }
        _.set(payload, 'status', 'ACTIVE');
        const response = {
            data: {
                ticketId,
                meta: payload
            },
            message: 'Ticket created successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = CreateTicket;