var express = require('express');
var router = express.Router();

//log out and redirect
router.get('/', function(req,res,next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        req.logout(); //efface user de session.passport
        res.redirect('/login');
    } else res.redirect('/login');
});

module.exports = router;