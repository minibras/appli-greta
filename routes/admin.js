var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if ((req.session.passport) && (req.session.passport.user != null)) {
        GLOBAL.schemas["Formation"].find({}, function (err, result) {
            if (err) {
                throw err;
            }
            GLOBAL.schemas["Formateur"].find({}, function (err, listformateur) {
                if (err) {
                    throw err;
                }
                res.render('admin', {
                    title: 'Adminisration',
                    formation: result,
                    formateurs: listformateur,
                    auth: true
                });
            });
        });
    } else res.redirect('/login');
});

module.exports = router;