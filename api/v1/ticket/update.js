const _ = require('lodash');

class UpdateTicket {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.ticketLogic = container.resolve('ticketLogic');
    }

    async handleRequest(req, res) {
        const payload = _.get(req, 'body', {});
        const ticketId = _.get(req, 'query.ticketId', null);
        // validate input here
        const [updateErr, ] = await this.utility.invoker(this.ticketLogic.createOrUpdate(payload, ticketId, null, 'update'));

        if (updateErr) {
            return res.status(400).json({
                data: null,
                message: 'Ticket could not be updated'
            });
        }

        const response = {
            message: 'Ticket updated successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = UpdateTicket;