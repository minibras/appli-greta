var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

router.route('/:_id').get(function (req, res) {
     GLOBAL.schemas["Formation"].remove({_id: new ObjectID(req.params._id)}, function(err, result) {
        if (err) {
            throw err;
        }
            GLOBAL.schemas["Formation"].find(function(err, listformation) {
                res.render('admin', {
                    title: 'List of formation :',
                    formation: listformation
                });
        });
    });
});

module.exports = router
