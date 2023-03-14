const Redis = require('ioredis');
const { off } = require('process');
const redis = new Redis();

class RedisRepo {
    constructor() { }

    getWholeHash(name) {
        return new Promise((resolve, reject) => {
            redis.hgetall(name, (err, res) => {
                if(err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    setKeysInHash(parentKey, meta) {
        return new Promise((resolve, reject) => {
            redis.hmset(parentKey, meta, (err, res) => {
                if(err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    deleteKey(name) {
        return new Promise((resolve, reject) => {
            redis.del(name, (err, res) => {
                if(err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }

    getKeyFromHash(name, key) {
        return new Promise((resolve, reject) => {
            redis.hget(name, key, (err, res) => {
                if(err) {
                    return reject(err);
                }
                return resolve(res);
            });
        });
    }
}

module.exports = RedisRepo;