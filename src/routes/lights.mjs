//@flow
import type {DataProvider} from "../services/data/dataProvider.mjs";
import type { Store } from 'redux';
import PROVIDERS from "../services/data/providers/providerEnum.mjs";
import ACTIONS from "../services/data/redux/enums/actionTypes.mjs";
import huejay from 'huejay';
import express from 'express';
var router = express.Router();


const HUE_USERNAME = process.env.HUE_USERNAME;


let client = new huejay.Client({
  host:     '192.168.1.13',
  username: HUE_USERNAME,
  timeout:  15000
});


router.get('/', function(req, res, next) {
    const state = getStoreFromReq(req).getState();
console.log(state)
    const devices = state.deviceControl.devices;
    const response =
        Array.from(devices)
             .map(x => Object.assign(
                 {},
                 x[1],
                 x[1].get('rawInput'),
             ));
    res.json({data:response});

    // client.lights.getAll()
    //       .then(lights => {
    //         res.json({data:lights});
    //       }).catch(err => {
    //         console.log(err);
    //       });
});
const getStoreFromReq = (req):* => {
    const dataProvider:DataProvider = req.custom.dataProvider;
    const store:* = dataProvider.get(PROVIDERS.REDUX);
    return store;
};

router.get('/:id/on', function(req, res, next) {
    let id = req.params.id;
    modifyLightById(id, turnOn).then(result => {
        const store: * = getStoreFromReq(req);
        store.dispatch({type:ACTIONS.DEVICE.ON, payload: {id}});
        res.send(result);
    })
});

router.get('/:id/off', function(req,res,next) {
    let id = req.params.id;
    modifyLightById(id, turnOff).then(result => {
        const store: * = getStoreFromReq(req);
        store.dispatch({type:ACTIONS.DEVICE.OFF, payload: {id}});
        res.send(result);
    })
});

router.get('/:id/set/:value', function(req,res,next) {
    let id = req.params.id;
    let value = req.params.value;
    modifyLightById(id, setter(value)).then(result => {
        const store: * = getStoreFromReq(req);
        store.dispatch({type:ACTIONS.DEVICE.BRIGHTNESS_CHANGE, payload: {id}});
        res.send(result);
    });
});

router.get('/:id/brighter', function(req,res,next) {
    let id = req.params.id;
    let brightenBy = Number(req.query.value || 5);
    modifyLightById(id, brighten(brightenBy)).then(result => {
        const store: * = getStoreFromReq(req);
        store.dispatch({type:ACTIONS.DEVICE.BRIGHTNESS_CHANGE, payload: {id}});
        res.send(result);
    });
});

router.get('/:id/dimmer', function(req,res,next) {
    let id = req.params.id;
    let dimBy = Number(req.query.value || 5);
    modifyLightById(id, brighten(-dimBy)).then(result => {
        const store: * = getStoreFromReq(req);
        store.dispatch({type:ACTIONS.DEVICE.BRIGHTNESS_CHANGE, payload: {id}});
        res.send(result);
    });

});
/* GET users listing. */
router.get('/on', function(req, res, next) {
  modifyGroupById(0,turnOn);
  res.send({});
});

router.get('/off', function(req, res, next) {
    modifyGroupById(0, turnOff);
    res.send({});
});


function modifyGroupById(id, modifierFunction) {
	return client.groups.getById(id)
	  .then(group => {
          let tempGroup = modifierFunction(group);

		  return client.groups.save(tempGroup);
	  })
	  .then(group => {
		console.log(`Group [${group.id}] was saved`);
	  })
	  .catch(error => {
		console.log(error.stack);
	  });
}

function modifyLightById(id, modifierFunction) {
    return client.lights.getById(id).then(light => {
        return client.lights.save(modifierFunction(light));
    }).catch(err => {
        console.log(err);
    })
}

function turnOff(obj) {
    let modifier = {
        on: false,
    }

    return Object.assign(obj, modifier)
}

function turnOn(obj) {
    let modifier = {
        on: true,
    };

    return Object.assign(obj, modifier);
}

const brighten = (incrementValue) =>(obj) => {
    let modifier = {
	on: true,
        brightness: obj.brightness + incrementValue >= 254 ? 254 : obj.brightness + incrementValue
    }
    //this function can be overloaded for negative brightness changes.  Protect against out of range issue
    if(modifier.brightness <= 0) {modifier.brightness = 0};
    return Object.assign(obj, modifier)
}


const setter = (targetValue) =>(obj) => {
    let modifier = {
        on: true,
        brightness: targetValue >= 254 ? 254 : targetValue
    };

    //this function can be overloaded for negative brightness changes.  Protect against out of range issue
    if(modifier.brightness <= 0) {modifier.brightness = 0};
    return Object.assign(obj, modifier)
}



export default router;
