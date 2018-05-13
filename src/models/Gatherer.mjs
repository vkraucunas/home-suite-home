// @flow
import BaseModel from "./BaseModel.mjs";

class Gatherer extends BaseModel{
    type: string;
    state: 'ready' | 'in-flight' | 'completed' | 'error';
    constructor(input:*) {
        const defaults = {
            type: 'single-attempt',
            state: 'ready',
        };
        super(Object.assign({},defaults,input));
    }
}

export default Gatherer;