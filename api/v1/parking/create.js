const _ = require('lodash');
const { v4: uuid } = require('uuid');

class CreateParking {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.utility.invoker = this.utility.common.invoker;
        this.parkingLogic = container.resolve('parkingLogic');
    }

    async handleRequest(req, res) {
        const payload = _.get(req, 'body', {});
        // validate input here
        const parkingId = uuid();
        const [createErr, ] = await this.utility.invoker(this.parkingLogic.createOrUpdate(payload, parkingId));

        if (createErr) {
            return res.status(400).json({
                data: null,
                message: 'Parking could not be created'
            });
        }

        const response = {
            data: {
                parkingId,
                meta: payload
            },
            message: 'Parking created successfully'
        }

        return res.status(200).json(response);
    }
}

module.exports = CreateParking;