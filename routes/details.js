var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
    GLOBAL.schemas["Formation"].find({}, function(err,result){
        //GLOBAL.Formation.find(function(err,result){
        if(err){
            throw err;
        }
        console.log(result);
        res.render('details', {title: 'Informations', formation: result});
    });
});

module.exports = router;
