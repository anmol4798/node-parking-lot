const _ = require('lodash');

class DeleteTicket {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.ticketLogic = container.resolve('ticketLogic');
    }

    async handleRequest(req, res) {
        const ticketId = _.get(req, 'query.ticketId', null);
        // validate input here
        const [deleteErr, ] = await this.utility.invoker(this.ticketLogic.delete(ticketId));

        if (deleteErr) {
            return res.status(400).json({
                data: null,
                message: 'Ticket could not be deleted'
            });
        }

        const response = {
            message: 'Ticket deleted successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = DeleteTicket;