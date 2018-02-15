// @flow
import BaseModel from "./BaseModel.mjs";

class Device extends BaseModel{
    id: string;
    reachable: boolean;
    enabled: boolean;
    on: boolean;
    constructor(input:*) {
        const defaults = {
            id:undefined,
            reachable:undefined,
            enabled:true,
            on:undefined,
        }
        super(defaults,input);
        this.modelConstructor = this.constructor;
    }
}



export default Device;