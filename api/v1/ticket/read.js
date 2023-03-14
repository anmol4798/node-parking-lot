const _ = require('lodash');

class ReadParking {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.ticketLogic = container.resolve('ticketLogic');
    }

    async handleRequest(req, res) {
        const ticketId = _.get(req, 'query.ticketId', null);
        // validate input here
        const [readErr, ticketMeta] = await this.utility.invoker(this.ticketLogic.fetch(ticketId));

        if (readErr) {
            return res.status(400).json({
                data: null,
                message: 'Ticket could not be fetched'
            });
        }

        const response = {
            data: ticketMeta,
            message: 'Ticket fetched successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = ReadParking;