var express = require('express');
var router = express.Router();
var userController = require('../controller/user-controller');

router.post('/', userController.loginUser);
  
module.exports = router;
