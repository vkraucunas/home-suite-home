//@flow
import ACTIONS from "../enums/actionTypes.mjs";

export interface IAction {
    type: ACTIONS,
    payload: any,
}
