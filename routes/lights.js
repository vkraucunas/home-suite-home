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

/* GET users listing. */
router.get('/on', function(req, res, next) {
  modifyGroupById(0,turnGroupOn);
  res.send({});
});

router.get('/off', function(req, res, next) {
    modifyGroupById(0, turnGroupOff);
    res.send({});
});


function modifyGroupById(id, modifierFunction) {
	client.groups.getById(id)
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

function turnGroupOff(group) {
    let modifier = {
        on: false,
        brightness: 0
    }

    return Object.assign(group, modifier)
}

function turnGroupOn(group) {
    let modifier = {
        on: true,
        brightness: 254
    };

    return Object.assign(group, modifier);
}
module.exports = router;
