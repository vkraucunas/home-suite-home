//@flow
import redux from 'redux'
import remoteReduxDevtools from 'remote-redux-devtools';

import BaseProvider from './baseProvider.mjs';
import PROVIDERS from "./providerEnum.mjs";
import rootReducer from '../redux/rootReducer.mjs';
import defaultState from '../redux/defaultState.mjs';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

// not working right now
// import remotedev from 'remotedev-server';
// remotedev({hostname: 'remote-dev', port: '8000', realtime: true});

const actionFormatter = (action,time,took) => `=> [${action.type}] (in ${took.toFixed(2)} ms)`;

class ReduxProvider extends BaseProvider {
    key:PROVIDERS;

    _reduxStore: Redux;

    constructor() {
        super();
        this.key = PROVIDERS.REDUX;
        const middleware: Array<*> = [
            reduxLogger.createLogger({
                titleFormatter: actionFormatter,
                colors: {
                    title: false,
                    prevState: false,
                    action: false,
                    nextState: false,
                    error: false,
                }
            }),
            thunk.default,

        ];
        console.log('default state', defaultState)
        this._reduxStore = redux.createStore(
            rootReducer,
            defaultState,
            redux.applyMiddleware(...middleware),
            // remoteReduxDevtools.composeWithDevTools({ realtime: true, port: 8000 })
        );
        this.init = () => Promise.resolve({key: this.key, service: this._reduxStore})
    }
}

export default ReduxProvider;