const _ = require('lodash');

class DeleteParking {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.parkingLogic = container.resolve('parkingLogic');
    }

    async handleRequest(req, res) {
        const parkingId = _.get(req, 'query.parkingId', null);
        // validate input here
        const [deleteErr, ] = await this.utility.invoker(this.parkingLogic.delete(parkingId));

        if (deleteErr) {
            return res.status(400).json({
                data: null,
                message: 'Parking could not be deleted'
            });
        }

        const response = {
            message: 'Parking deleted successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = DeleteParking;