var express = require('express');
var router = express.Router();
let huejay = require('huejay');

const HUE_USERNAME = process.env.HUE_USERNAME;


let client = new huejay.Client({
  host:     '192.168.2.162',
  username: HUE_USERNAME, 
  timeout:  15000
});


router.get('/', function(req, res, next) {
    client.lights.getAll()
          .then(lights => {
            res.send(lights);
          }).catch(err => {
            console.log(err);  
          });
});

router.get('/:id/on', function(req, res, next) {
    let id = req.params.id;
    modifyLightById(id, turnOn).then(result => {
        res.send(result);
    })
});

router.get('/:id/off', function(req,res,next) {
    let id = req.params.id;
    modifyLightById(id, turnOff).then(result => {
        res.send(result);   
    })
});

router.get('/:id/brighter', function(req,res,next) {
    let id = req.params.id;
    let brightenBy = req.query.value || 5;
    modifyLightById(id, brighten(brightenBy)).then(result => {
       res.send(result); 
    });
});

router.get('/:id/dimmer', function(req,res,next) {
    let id = req.params.id;
    let dimBy = req.query.value || 5;
    modifyLightById(id, brighten(-dimBy)).then(result => {
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
        brightness: 0
    }

    return Object.assign(obj, modifier)
}

function turnOn(obj) {
    let modifier = {
        on: true,
        brightness: 254
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



module.exports = router;
