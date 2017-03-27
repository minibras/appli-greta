var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Formateur"].remove({
            _id: req.params._id
        }, function (err, result) {
            if (err) {
                throw err;
            }
            GLOBAL.schemas["Formateur"].find(function (err, listformateur) {
                if (err) {
                    throw err;
                }
                GLOBAL.schemas["Formation"].find(function (err, listformation) {
                    if (err) {
                        throw err;
                    }
                    res.render('admin', {
                        title: 'List of formation :',
                        formateurs: listformateur,
                        formation: listformation,
                        auth: true
                    });
                });
            });
        });
    } else res.redirect('/login');
});

module.exports = router