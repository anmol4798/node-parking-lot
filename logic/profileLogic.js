const _ = require('lodash');

class ParkingLogic {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.constants = this.utility.constants;
        this.utility.invoker = this.utility.common.invoker;
    }

    async fetch(parkingId) {
        return await this.genericRedisRepo.getKey(`Parking_${parkingId}`);
    }

    async createOrUpdate(meta) {
        let keysAndValues = [];
        _.forEach(_.keys(meta), (key) => {
            keysAndValues.push(key, meta[key]);
        });
        return await this.vendorRepo.setKeysInHash(`Parking_${meta.parkingId}`, keysAndvalues);
    }

    async delete(parkingId) {
        return await this.genericRedisRepo.deleteKey(`Parking_${parkingId}`);
    }

}

module.exports = ParkingLogic;