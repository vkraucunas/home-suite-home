//@flow
import type {DataProvider} from "./data/dataProvider.mjs";
import PROVIDERS from "./data/providers/providerEnum.mjs";
import HueController from '../models/HueController.mjs';

import ACTIONS from "./data/redux/enums/actionTypes.mjs";
import Action from "./data/redux/actions/Action.mjs";

const researchingDevices = () => new Action(ACTIONS.DEVICES.RESEARCH);
const updateDevices = () => new Action(ACTIONS.DEVICES.UPDATED);

class DeviceService {
    research: () => void;

    constructor(dataProvider:DataProvider) {
        const store = (dataProvider.get(PROVIDERS.REDUX));
        const dispatch = store.dispatch;

        const installSubscription = (redux:*) => {
            const state = redux.getState();
            let getLength = (state) => {
                if(state.deviceControl.devices) {
                    return state.deviceControl.devices.size || 0;
                } else {
                    return 0;
                }
            }
            let length = getLength(state);

            return redux.subscribe(() => {
                const midActionLength = getLength(redux.getState());

                if(midActionLength != length) {
                    length = midActionLength;
                    dispatch({type:ACTIONS.DEVICES.VALIDATED, payload:{length}});
                }
            });
        }

        this.research = () => {
            const uninstall = installSubscription(store);
            dispatch(researchingDevices());

            const cont:HueController = new HueController({
                'ip_address': '192.168.1.2',
                'key': process.env.HUE_USERNAME,
            });

            cont.research(dispatch)
                .then(() => {

                    dispatch(updateDevices());
                    uninstall();
                });


        }
    }
}

export default DeviceService;