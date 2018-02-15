//@flow
import Action from './Action.mjs';
import BaseAction from './BaseAction.mjs';

class AsyncAction extends BaseAction {
    constructor(payload: Promise<*>, errorAction:*) {
        super();
        return (dispatch: *) => payload
            .then((x:typeof Action)=>dispatch(x))
            .catch(err => dispatch(errorAction));
    }
}

export default AsyncAction;