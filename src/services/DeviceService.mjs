//@flow
import { DataProvider } from "./data/dataProvider.mjs";
import PROVIDERS from "./data/providers/providerEnum.mjs";
import type { Store } from 'redux';
import ACTIONS from "./data/redux/enums/actionTypes.mjs";
import HueMock from './data/mock/hue.mjs';
import Action from "./data/redux/actions/Action.mjs";


const research:Promise<void> = dispatch => {
    return Promise.resolve(HueMock.map(x => {
        dispatch(new Action(ACTIONS.DEVICE.ADD, x));
    }));
};

const researchingDevices = () => new Action(ACTIONS.DEVICES.RESEARCH);
const updateDevices = () => new Action(ACTIONS.DEVICES.UPDATED);

class DeviceService {
    research: () => void;

    constructor(dataProvider:DataProvider) {
        const store: Store = dataProvider.get(PROVIDERS.REDUX);
        const dispatch = store.dispatch;

        const installSubscription = (redux:Store) => {
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
            research(dispatch);
            dispatch(updateDevices());
            uninstall();
        }
    }
}

export default DeviceService;