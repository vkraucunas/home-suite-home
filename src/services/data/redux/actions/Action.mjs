//@flow
import type {IAction} from './IAction.mjs';
import ACTIONS from "../enums/actionTypes.mjs";

class Action implements IAction {
    constructor(type:ACTIONS, payload: any) {
        return {type,payload};
    }
}

export default Action;