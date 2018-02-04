//@flow
import ACTIONS from "../enums/actionTypes.mjs";
import StateTypes from "../enums/stateTypes.mjs";
import Action from "../actions/Action.mjs";

const deviceControl = (state:* = {}, action:Action) => {
    switch (action.type) {
        case ACTIONS.DEVICE.ADD:
            const newDevices:Map<string, *> = state.devices || new Map();
            newDevices.set(action.payload.id,action.payload);
            return Object.assign({}, state, {devices: newDevices}, { validity: StateTypes.INVALID});
        case ACTIONS.DEVICE.ON:
            if(!action.payload.id) return state;
            var deviceId:string = action.payload.id;
            var device:* = state.devices.get(deviceId);
            var updatedDevice = Object.assign({}, device, {on:true});
            return Object.assign({}, state,{devices:state.devices.set(deviceId,updatedDevice)});
        case ACTIONS.DEVICE.OFF:
            if(!action.payload.id) return state;
            var deviceId:string = action.payload.id;
            var device:* = state.devices.get(deviceId);
            var updatedDevice = Object.assign({}, device, {on:false});
            return Object.assign({}, state,{devices:state.devices.set(deviceId,updatedDevice)});
        case ACTIONS.DEVICES.VALIDATED:
            return Object.assign({},state, action.payload,{ validity: StateTypes.VALID});
        case ACTIONS.DEVICES.INVALIDATED:
            return Object.assign({},state, action.payload,{ validity: StateTypes.INVALID});
        case ACTIONS.DEVICES.UPDATED:
            return Object.assign({},state, action.payload,{ validity: StateTypes.VALID});
        default:
            return state;
    }
};

export default deviceControl;