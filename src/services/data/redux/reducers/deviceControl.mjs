//@flow
import ACTIONS from "../enums/actionTypes.mjs";
import StateTypes from "../enums/stateTypes.mjs";
import Action from "../actions/Action.mjs";
import Device from "../../../../models/Device.mjs";

const toggleDeviceState = state => action => on => {
    // If no id is present we cant update anything
    if(!action.payload.id) return state;
    var deviceId:string = action.payload.id;
    //If we don't know about this id we bail out
    if(!state.devices.has(deviceId)) return state;
    var device:Device = state.devices.get(deviceId);

    var updatedDevice = device.set('on',on);
    return Object.assign({}, state,{devices:state.devices.set(deviceId,updatedDevice)});
};

const deviceControl = (state:* = {}, action:Action) => {
    const toggle = toggleDeviceState(state)(action);
    switch (action.type) {
        case ACTIONS.DEVICE.ADD:
            const newDevices:Map<string, $Subtype<Device>> = state.devices || new Map();
            const data = action.payload.data;
            if(data){
                newDevices.set(data.get('id'),data);
            }
            return Object.assign({}, state, {devices: newDevices}, { validity: StateTypes.INVALID});
        case ACTIONS.DEVICE.ON:
            return toggle(true);
        case ACTIONS.DEVICE.OFF:
            return toggle(false);
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