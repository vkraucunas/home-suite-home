import express from 'express';
import Denon from 'denon-client';

var router = express.Router();
var client = new Denon.DenonClient('192.168.2.128');



router.get('/', function(req, res, next) {

});




export default router;
