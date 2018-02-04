// @flow
import Server from './server.mjs';
import DataProvider from './services/data/dataProvider.mjs';
import SuiteService from "./services/SuiteService.mjs";

const start = () => {
    DataProvider.init().then(dataProvider => {
        new SuiteService(dataProvider);


        new Server(dataProvider);

    });

};

export default { launch: start}
