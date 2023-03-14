const _ = require('lodash');

class TicketLogic {
    constructor(container) {
        this.utility = container.resolve('utility');
        this.constants = this.utility.constants;
        this.utility.invoker = this.utility.common.invoker;
        this.redisRepo = container.resolve('redisRepo');
    }

    async fetch(ticketId) {
        return await this.redisRepo.getWholeHash(`Ticket_${ticketId}`);
    }

    async createOrUpdate(meta, ticketId, parkingId, action) {
        let keysAndValues = [];
        if(action == 'update') {
            delete meta.parkingId;
        }
        _.forEach(_.keys(meta), (key) => {
            keysAndValues.push(key, meta[key]);
        });
        keysAndValues.push('status', 'ACTIVE');
        await this.redisRepo.setKeysInHash(`Ticket_${ticketId}`, keysAndValues);
        if(parkingId && action == 'create') {
            let [ticketsErr, tickets] = await this.utility.invoker(this.redisRepo.getKeyFromHash(`Parking_${parkingId}`, 'tickets'));
            tickets = tickets || "[]";
            tickets = JSON.parse(tickets);
            if(!_.includes(tickets, ticketId)) {
                tickets.push(ticketId);
            }
            tickets = JSON.stringify(tickets);
            await this.redisRepo.setKeysInHash(`Parking_${parkingId}`, ['tickets', tickets]);
        }
        return;
    }

    async delete(ticketId) {
        return await this.redisRepo.deleteKey(`Ticket_${ticketId}`);
    }

    async settle(ticketId) {
        return await this.redisRepo.setKeysInHash(`Ticket_${ticketId}`, ['status', 'SETTLED']);
    }

}

module.exports = TicketLogic;