var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
    GLOBAL.schemas["Formateur"].find({}, function (err, result) {
        if (err) {
            throw err;
        }
        res.render('addform', {
            formateurs: result,
            title: 'create a new',
            libelle: "creation",
            form_action: "/newForm",
            auth: true
        });
    });
    } else {
        res.redirect('/login')
    }
});
module.exports = router;