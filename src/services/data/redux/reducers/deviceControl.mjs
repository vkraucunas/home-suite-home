//@flow
import ACTIONS from "../enums/actionTypes.mjs";
import typeof {IAction} from "../actions/IAction.mjs";
import StateTypes from "../enums/stateTypes.mjs";

const deviceControl = (state:* = {}, action:IAction) => {
    switch (action.type) {
        case ACTIONS.DEVICE.ADD:
            const newDevices:Map<string, *> = state.devices || new Map();
            newDevices.set(action.payload.id,action.payload);
            return Object.assign({}, state, {devices: newDevices}, { validity: StateTypes.INVALID});
        case ACTIONS.DEVICE.ON:
            var deviceId:string = action.payload.id || null;
            var device:* = state.devices.get(deviceId);
            var updatedDevice = Object.assign({}, device, {attributes:{state:{attributes:{on:true}}}});
            return Object.assign({}, state,{devices:state.devices.set(deviceId,updatedDevice)});
        case ACTIONS.DEVICE.OFF:
            var deviceId:string = action.payload.id || null;
            var device:* = state.devices.get(deviceId);
            var updatedDevice = Object.assign({}, device, {attributes:{state:{attributes:{on:false}}}});
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