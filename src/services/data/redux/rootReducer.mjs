//@flow

import redux from 'redux'

import applicationControl from './reducers/applicationControl.mjs';
import deviceControl from './reducers/deviceControl.mjs';
import researchControl from './reducers/researchControl.mjs';


const rootReducer = redux.combineReducers({
    applicationControl,
    researchControl,
    deviceControl,
})

export default rootReducer