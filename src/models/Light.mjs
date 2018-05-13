// @flow
import Device from "./Device.mjs";

class Light extends Device {
    constructor(input:*) {
        const defaults = {
            color: undefined,
            brightness: undefined,
            disabled: undefined,
        };
        super(Object.assign({},defaults,input));
    }
}

export default Light;