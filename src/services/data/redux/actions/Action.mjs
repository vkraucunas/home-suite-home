//@flow
import BaseAction from "./BaseAction.mjs";

class Action extends BaseAction {
    type:string;
    payload:*;
    toJSON:*;
    constructor(type:string, payload: *) {
        super();
        this.type = type;
        this.payload = payload;
        this.toJSON = () => {type,payload};
    }
}

export default Action;