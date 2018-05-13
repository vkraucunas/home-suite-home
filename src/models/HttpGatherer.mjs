// @flow
import Gatherer from "./Gatherer.mjs";

interface IExecute {
    execute: () => void;
}

class HttpGatherer extends Gatherer {
    type: string;
    state: 'ready' | 'in-flight' | 'completed' | 'error';
    url: string;
    execute: () => void;
    constructor(input:*) {
        const defaults = {
            verb: 'GET',
            state: 'ready',
            type: 'single-attempt',
            url: undefined,
        };
        super(Object.assign({},defaults,input));

        this.execute = () => {return};
    }
}

export default Gatherer;