// @flow
import ACTIONS from "../enums/actionTypes.mjs";
import StateTypes from "../enums/stateTypes.mjs";
import Action from '../actions/Action.mjs';

const researchControl = (state:* = {}, action:Action) => {
    switch (action.type) {
        case ACTIONS.SUITE.INVALIDATE:
            return Object.assign({}, state, {status: StateTypes.INVALID});
        case ACTIONS.DEVICES.RESEARCH:
            return Object.assign({}, state, {status: StateTypes.RESEARCHING});
        case ACTIONS.DEVICES.UPDATED:
            return Object.assign({}, state, {status: StateTypes.VALID, validity: StateTypes.VALID});
        default:
            return state;
    }
};


export default researchControl;