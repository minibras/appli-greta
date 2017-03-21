var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

router.route('/:_id').get(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Formation"].find({
            _id:req.params._id
        }).populate("formateurs").exec(
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.render('detform', {
                    title: 'Informations générales',
                    formation: result[0],
                    auth: true
                });
            });
    } else {
        GLOBAL.schemas["Formation"].find({
            _id:req.params._id
        }).populate("formateurs").exec(
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.render('detform', {
                    title: 'Informations générales',
                    formation: result[0],
                });
            });
    }
});
module.exports = router;