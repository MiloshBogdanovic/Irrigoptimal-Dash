var express = require('express');
var router = express.Router();
const passport = require("passport");
/* GET home page. */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req)
  return res.json({ msg: `Hey ${req.user}! I open at the close.` });
});


module.exports = router;
