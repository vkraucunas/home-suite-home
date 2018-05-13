// @flow
import HueJay from 'huejay';

import Controller from "./Controller.mjs";
//import HueMock from '../services/data/mock/hue.mjs';
import ACTIONS from "../services/data/redux/enums/actionTypes.mjs";
import Action from "../services/data/redux/actions/Action.mjs";

import Light from '../models/Light.mjs';
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

    const result = new Light()
        .set('id', rawInput.attributes.attributes.uniqueid)
        .set('reachable', rawInput.state.attributes.reachable)
        .set('disabled', rawInput.state.attributes.reachable)
        .set('on', rawInput.state.attributes.on)
        .set('rawInput', rawInput);

    return result;
};

const researchLights = (client:HueJay) => dispatch =>
    client.lights.getAll()
        .then(lights => {
            lights.map(x => {
                dispatch(new Action(ACTIONS.DEVICE.ADD, {data: hueToDeviceDTO(x)}));
            });
        })
        .catch(console.log);


class HueController extends Controller {
    key: string;
    research: (dispatch:*) => Promise<*>;
    constructor(input: *) {
        const defaults = {
            key: undefined,
            ip_address: ''
        };
        super(Object.assign({}, defaults, input));

        let client = new HueJay.Client({
            host:     this.get('ip_address'),
            username: this.get('key'),
            timeout:  15000
        });

        const researchMethod = researchLights(client);
        this.research = new AsyncAction(researchMethod, new Action(ACTIONS.DEVICES.INVALIDATED));
    }
}

export default HueController;