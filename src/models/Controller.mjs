// @flow
import Device from "./Device.mjs";

class Controller extends Device{
    ip_address: string;
    connection_type: 'IP';
    constructor(input:*) {
        const defaults = {
            connection_type: 'IP',
            ip_address: '',
        };
        super(Object.assign({},defaults,input));
        this.modelConstructor = this.constructor;
    }
}

export default Controller;