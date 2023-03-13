const _ = require('lodash');

class ReadParking {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.parkingLogic = container.resolve('parkingLogic');
    }

    async handleRequest(req, res) {
        const parkingId = _.get(req, 'query.parkingId', null);
        // validate input here
        const [readErr, parkingMeta] = await this.utility.invoker(this.parkingLogic.fetch(parkingId));

        if (readErr) {
            return res.status(400).json({
                data: null,
                message: 'Parking could not be fetched'
            });
        }

        const response = {
            data: parkingMeta,
            message: 'Parking fetched successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = ReadParking;