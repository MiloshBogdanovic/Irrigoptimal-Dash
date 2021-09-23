var express = require('express');
require("dotenv").config();
var router = express.Router();
const passport = require("passport");

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    return res.json({ msg: `Hey ${req.user.name}! I open at the close.` });
});


router.post('/', passport.authenticate('jwt', { session: false }),  (req, res) => {

    return res.json({ msg:'POST'});
});

module.exports = router;