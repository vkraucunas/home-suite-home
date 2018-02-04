// @flow
import { DataProvider } from "./data/dataProvider.mjs";
import PROVIDERS from "./data/providers/providerEnum.mjs";
import ACTIONS from "./data/redux/enums/actionTypes.mjs";
import DeviceService from "./DeviceService.mjs";
import AsyncAction from './data/redux/actions/AsyncAction.mjs';
import Action from './data/redux/actions/Action.mjs';


const invalidateSuite = (err) => new Action(ACTIONS.SUITE.INVALIDATE,err);
const validateSuite = new AsyncAction(Promise.resolve(new Action(ACTIONS.SUITE.VALIDATE)), invalidateSuite);
const launchSuite = new Action(ACTIONS.ON);
const shutdownSuite = () => new Action(ACTIONS.OFF);

class SuiteService {
    invalidate: () => void;
    init: () => void;

    constructor(dataProvider:DataProvider) {
        const redux = dataProvider.get(PROVIDERS.REDUX);
        const deviceService:DeviceService = new DeviceService(dataProvider);

        const dispatch = redux.dispatch;
        this.invalidate = () => dispatch(invalidateSuite(deviceService));
        this.init = () => {
            dispatch(launchSuite);
            deviceService.research();
            dispatch(new AsyncAction(Promise.resolve(validateSuite), (err) => invalidateSuite(err)));
            //dispatch((d) => d(validateSuite()));
        }
    }
}

export default SuiteService;
