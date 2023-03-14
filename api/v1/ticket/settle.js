const _ = require('lodash');

class SettleTicket {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.ticketLogic = container.resolve('ticketLogic');
    }

    async handleRequest(req, res) {
        const ticketId = _.get(req, 'query.ticketId', null);
        // validate input here
        const [settleErr, ] = await this.utility.invoker(this.ticketLogic.settle(ticketId));

        if (settleErr) {
            return res.status(400).json({
                data: null,
                message: 'Ticket could not be settled'
            });
        }

        const response = {
            message: 'Ticket settled successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = SettleTicket;