const _ = require('lodash');

class ParkingLogic {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.constants = this.utility.constants;
        this.utility.invoker = this.utility.common.invoker;
        this.redisRepo = container.resolve('redisRepo');
    }

    async fetch(parkingId) {
        let [parkingErr, parking] = await this.utility.invoker(this.redisRepo.getWholeHash(`Parking_${parkingId}`));
        _.set(parking, 'tickets', JSON.parse(_.get(parking, 'tickets', "[]")));
        return parking;
    }

    async createOrUpdate(meta, parkingId) {
        let keysAndValues = [];
        _.forEach(_.keys(meta), (key) => {
            keysAndValues.push(key, meta[key]);
        });
        return await this.redisRepo.setKeysInHash(`Parking_${parkingId}`, keysAndValues);
    }

    async delete(parkingId) {
        return await this.redisRepo.deleteKey(`Parking_${parkingId}`);
    }

}

module.exports = ParkingLogic;