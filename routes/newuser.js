var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req,res,next) {
    res.render('adduser', {
        title: 'create a new',
        libelle: "creation",
        form_action: "/newUser"
    });
});

module.exports = router;