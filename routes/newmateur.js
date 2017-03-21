var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        res.render('addmateur', {
            title: 'create a new',
            libelle: "creation",
            form_action: "/newMateur",
            auth: true
        });
    } else res.redirect('/login');
});

module.exports = router;