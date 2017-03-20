var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

router.route('/:_id').get(function (req, res){
    
    GLOBAL.schemas["Formation"].find({_id: new ObjectId(req.params._id)}).populate("formateurs", ['nom']).exec(
        function (err, result){
            if (err) {
                throw err;
            } 
            res.render('detform', {
                title: 'informations',
                formation: result[0]
            });
    });
});
module.exports = router;