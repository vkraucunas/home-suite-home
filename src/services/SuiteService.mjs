// @flow
import { DataProvider } from "./data/dataProvider.mjs";
import PROVIDERS from "./data/providers/providerEnum.mjs";
import ACTIONS from "./data/redux/enums/actionTypes.mjs";
import DeviceService from "./DeviceService.mjs";
import AsyncAction from './data/redux/actions/AsyncAction.mjs';
import Action from './data/redux/actions/Action.mjs';


const invalidateSuite = () => new Action(ACTIONS.SUITE.INVALIDATE);
const validateSuite = () => new AsyncAction(Promise.resolve(new Action(ACTIONS.SUITE.VALIDATE)), invalidateSuite);
const launchSuite = () =>new Action(ACTIONS.ON);
const shutdownSuite = () => new Action(ACTIONS.OFF);

class SuiteService {
    invalidate: () => void;
    init: () => void;

    constructor(dataProvider:DataProvider) {
        const redux = dataProvider.get(PROVIDERS.REDUX);
        const deviceService:DeviceService = new DeviceService(dataProvider);

        const dispatch = redux.dispatch;
        this.invalidate = () => dispatch(invalidateSuite());
        this.init = () => {
            // Mark suite as On
            dispatch(launchSuite());

            // Because devices likely changed lets do our homework
            deviceService.research();


            dispatch(validateSuite());
        }
    }
}

export default SuiteService;
