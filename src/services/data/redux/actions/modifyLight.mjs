//@flow
import ACTIONS from '../enums/actionTypes.mjs';
import Action from "./Action.mjs";

const modifyLight = (id) => new Action(ACTIONS.DEVICE.BRIGHTNESS_CHANGE, id)

export default modifyLight;