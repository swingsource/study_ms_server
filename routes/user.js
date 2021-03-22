var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')

/* GET users listing. */
router.get('/getDate', function(req, res, next) {
  userController.showUser(req, res, next)
});

module.exports = router;
