import BaseProvider from './baseProvider.mjs';
import PROVIDERS from './providerEnum.mjs';

export interface IProviderKey {
    key:PROVIDERS,
    service:$Subtype<BaseProvider>
}

export default {}