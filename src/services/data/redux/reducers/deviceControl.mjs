//@flow
import ACTIONS from "../enums/actionTypes.mjs";
import StateTypes from "../enums/stateTypes.mjs";
import Action from "../actions/Action.mjs";
import Device from "../../../../models/Device.mjs";

const toggleDeviceState = state => action => on => {
    if(!action.payload.id) return state;
    var deviceId:string = action.payload.id;
    var device:Device = state.devices.get(deviceId);
    var updatedDevice = device.set('on',on);
    return Object.assign({}, state,{devices:state.devices.set(deviceId,updatedDevice)});
};

const deviceControl = (state:* = {}, action:Action) => {
    switch (action.type) {
        case ACTIONS.DEVICE.ADD:
            const newDevices:Map<string, *> = state.devices || new Map();
            const data = action.payload.data;
            if(data){
                newDevices.set(data.get('id'),data);
            }
            return Object.assign({}, state, {devices: newDevices}, { validity: StateTypes.INVALID});
        case ACTIONS.DEVICE.ON:
            return toggleDeviceState(state)(action)(true);
        case ACTIONS.DEVICE.OFF:
            return toggleDeviceState(state)(action)(false);
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