var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

router.route('/').post(function (req, res) {
    //console.log('req.originalUrl : ', req.originalUrl);
    if ((req.session.passport) && (req.session.passport.user != null)) {
        if (!req.body.hasOwnProperty("_id")) req.body._id = new ObjectId();
        GLOBAL.schemas["Formation"].create([req.body],
            function (err, result) {
                if (err) {
                    throw err;
                }
                res.render('detform', {
                    title: 'creating formation without error datas below :',
                    formation: result[0],
                    auth : true
                });
            });
    } else { res.redirect('/login'); }
});

module.exports = router;