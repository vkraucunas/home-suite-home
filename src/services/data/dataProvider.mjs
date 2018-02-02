//@flow
import RedisProvider from './providers/redisProvider.mjs';
import PROVIDERS from './providers/providerEnum.mjs';
import BaseProvider from './providers/baseProvider.mjs';
import ReduxStoreProvider from './providers/reduxStoreProvider.mjs';

export class DataProvider {
    get:(provider:PROVIDERS) => *;
    constructor(services:Map<PROVIDERS, $Subtype<BaseProvider>>) {
        this.get = (serviceName:PROVIDERS) => services.get(serviceName);
    }
}

const initServices = (servicesToInit:Map<PROVIDERS, $Subtype<BaseProvider>>) => {
    console.log('Initializing data services');

    const serviceList: Array<$Subtype<BaseProvider>> = [];

    // We need to convert the input map into a promise array of init'd services
    // however we still need the keys to 'install' the provider
    Array.from(servicesToInit.keys())
        .map(k => serviceList.push(servicesToInit.get(k).init()))

    return Promise.all(serviceList)
        .then((results: Array<{key:PROVIDERS,service:$Subtype<BaseProvider>}>) => {
            console.log('...data services init complete');

            const services = new Map();
            results.map(x => services.set(x.key, x.service));

            return new DataProvider(services);
        })
}

export default {
    init: ():Promise<DataProvider> => {
        const servicesToInit: Map<PROVIDERS, $Subtype<BaseProvider>> = new Map();
        const installProvider = (provider: $Subtype<BaseProvider>) => {
            servicesToInit.set(provider.key, provider);
        }

        installProvider(new RedisProvider());
        installProvider(new ReduxStoreProvider());

        return initServices(servicesToInit);
    }
}