var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

/*set formation from _id with new data for an update into mongodb*/
router.route('/:_id').post(function (req, res) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
    GLOBAL.schemas["Formation"].update({
            _id: req.params._id
        }, {
            $set: req.body
        },
        function (err, result) {
            if (err) {
                throw err;
            }
            //console.log('modifyUser: ', result);
            GLOBAL.schemas["Formation"].find({
                _id: req.params._id
            }).populate("formateurs").exec(function (err, result) {
                if (err) {
                    throw err;
                }
                //console.log('user: ', result);
                res.render('detform', {
                    title: 'formation modifier sans erreur',
                    formation: result[0],
                    auth: true
                });
            });
        });
    } else {
        res.redirect('/login');
    }
});
module.exports = router;