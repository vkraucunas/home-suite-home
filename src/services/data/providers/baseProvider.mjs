//@flow
import PROVIDERS from './providerEnum.mjs';
import type { IProviderKey } from './IProviderKey.mjs';

class BaseProvider {
    key:PROVIDERS;
    init: () => Promise<IProviderKey>;
}

export default BaseProvider;