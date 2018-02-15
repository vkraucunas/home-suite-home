// @flow
import Controller from "./Controller.mjs";
import HueMock from '../services/data/mock/hue.mjs';
import ACTIONS from "../services/data/redux/enums/actionTypes.mjs";
import Action from "../services/data/redux/actions/Action.mjs";

import Device from '../models/Device.mjs';
import AsyncAction from "../services/data/redux/actions/AsyncAction.mjs";


const hueToDeviceDTO = (rawInput: *) => {
    // {
    //     "attributes": {
    //         "attributes": {
    //             "id": "1",
    //                 "name": "Living room",
    //                 "type": "Dimmable light",
    //                 "uniqueid": "00:17:88:01:10:3a:68:44-0b",
    //                 "manufacturername": "Philips",
    //                 "modelid": "LWB006",
    //                 "swversion": "5.105.0.21169"
    //         },
    //     "changed": {}
    //     },
    //     "state": {"attributes": {"on": false, "reachable": true, "bri": 145, "alert": "none"}, "changed": {}}
    // }

    const result = new Device()
        .set('id', rawInput.attributes.attributes.uniqueid)
        .set('reachable', rawInput.state.attributes.reachable)
        .set('on', rawInput.state.attributes.on)
        .set('custom', {rawInput});

    return result;
};

const researchLights = Promise.resolve(dispatch => HueMock.map(x => {
    dispatch(new Action(ACTIONS.DEVICE.ADD, {data: hueToDeviceDTO(x)}));
}));


class HueController extends Controller {
    key: string;
    research: (dispatch:*) => Promise<*>;
    constructor(input: *) {
        const defaults = {
            key: undefined,
        };
        super(Object.assign({}, defaults, input));

        this.research = new AsyncAction(researchLights, new Action(ACTIONS.DEVICES.INVALIDATED));
    }
}

export default HueController;