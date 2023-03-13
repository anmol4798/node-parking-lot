const _ = require('lodash');

class UpdateParking {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.parkingLogic = container.resolve('parkingLogic');
    }

    async handleRequest(req, res) {
        const payload = _.get(req, 'body', {});
        const parkingId = _.get(req, 'query.parkingId', null);
        // validate input here
        const [updateErr, ] = await this.utility.invoker(this.parkingLogic.createOrUpdate(payload, parkingId));

        if (updateErr) {
            return res.status(400).json({
                data: null,
                message: 'Parking could not be updated'
            });
        }

        const response = {
            message: 'Parking updated successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = UpdateParking;