//@flow
import Server from './server.mjs';
import DataProvider from './services/data/dataProvider.mjs';
import DeviceService from "./services/DeviceService.mjs";
import SuiteService from "./services/SuiteService.mjs";

const init = () => {
  DataProvider.init().then((dataProvider:DataProvider) => {
        const suiteService = new SuiteService(dataProvider);
        suiteService.init();

        Server.init(dataProvider);
    }).catch(console.log);
};

export default { launch: init}
