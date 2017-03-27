var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


/*get user from id*/
router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Formation"].find({
            _id: req.params._id
        }, function (err, result) {
            if (err) {
                throw err;
            }
            GLOBAL.schemas["Formateur"].find({}, function (err, results) {
                if (err) {
                    throw err;
                }
                res.render('modForm', {
                    title: "modification formation",
                    libelle: "modification",
                    form_action: "/modifyform",
                    formation: result[0], //il n'y a qu'une reponse possible puisque request _id,
                    formateurs: results,
                    auth: true
                });
            });
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router
