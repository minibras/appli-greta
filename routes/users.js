var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        res.send('respond with a resource');
    } else res.redirect('/login');
});

module.exports = router;