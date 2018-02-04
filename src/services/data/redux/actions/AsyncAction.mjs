//@flow
import Action from './Action.mjs';
import BaseAction from './BaseAction.mjs';

class AsyncAction extends BaseAction {
    constructor(payload: Promise<*>, errorAction:(err:*) => $Subtype<Action>) {
        super();
        return (dispatch: *) => payload
            .then((x:typeof Action)=>dispatch(x))
            .catch(err => dispatch(errorAction(err)));
    }
}

export default AsyncAction;