//@flow
import IoRedis from 'ioredis';
import BaseProvider from './baseProvider.mjs';
import PROVIDERS from "./providerEnum.mjs";

class RedisProvider extends BaseProvider {
    key:PROVIDERS;

    _redisClient:?IoRedis;

    constructor() {
        super();
        this.key = PROVIDERS.REDIS
        this.init = () => Promise.resolve({key: this.key, service: () =>{}})
    }
}

export default RedisProvider;