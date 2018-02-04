//@flow

import StateTypes from "../enums/stateTypes.mjs";
import ACTIONS from "../enums/actionTypes.mjs";
import Action from "../actions/Action.mjs";

const applicationControlReducer = (state:* = {}, action:$Subtype<Action>) => {
    switch (action.type) {
        case ACTIONS.ON:
            return Object.assign({},state, { status: StateTypes.ACTIVATING});
        case ACTIONS.SUITE.VALIDATE:
            return Object.assign({},state, { validity: StateTypes.VALID, status: StateTypes.VALID});
        case ACTIONS.SUITE.INVALIDATE:
            return Object.assign({},state, { validity: StateTypes.INVALID});
        case ACTIONS.SUITE.RESEARCH:
            return Object.assign({},state, { status: StateTypes.RESEARCHING});
        default:
            return state;
    }
};


export default applicationControlReducer;