var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


/*get user from id*/
router.route('/:_id').get(function (req, res) {
    //console.log('req.originalUrl : ' ,req.originalUrl);
    GLOBAL.schemas["Formation"].find({
        _id: req.params._id
    }).populate("formateurs").exec(function (err, result) {
        if (err) {
            throw err;
        }
        //console.log('formUser: ', result);
        res.render('modForm', {
            title: "modification formation",
            libelle: "modification",
            form_action: "/modifyform",
            formation: result[0] //il n'y a qu'une reponse possible puisque request _id
        });
    });
});

module.exports = router