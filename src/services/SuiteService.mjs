//@flow
import { DataProvider } from "./data/dataProvider.mjs";
import PROVIDERS from "./data/providers/providerEnum.mjs";
import type { Store } from 'redux';
import ACTIONS from "./data/redux/enums/actionTypes.mjs";
import DeviceService from "./DeviceService.mjs";
import Action from './data/redux/actions/Action.mjs';

const validateSuite = () => new Action(ACTIONS.SUITE.VALIDATE);
const invalidateSuite = () => new Action(ACTIONS.SUITE.INVALIDATE);
const launchSuite = () => new Action(ACTIONS.ON);

class SuiteService {
    invalidate: () => void;
    init: () => void;

    constructor(dataProvider:DataProvider) {
        const redux: Store = dataProvider.get(PROVIDERS.REDUX);
        const deviceService:DeviceService = new DeviceService(dataProvider);

        const dispatch = redux.dispatch;
        this.invalidate = () => dispatch(invalidateSuite(deviceService));
        this.init = () => {
            dispatch(launchSuite());
            deviceService.research();
            dispatch((d) => d(validateSuite()));
        }

    }
}

export default SuiteService;