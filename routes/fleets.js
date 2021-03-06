var express = require('express');
var router = express.Router();

var Fleet = require('../models/fleet');

router.post('/create', function(req, res, next) {
    req.checkBody('make', 'Make must be specified.').notEmpty(); 
    req.checkBody('model', 'Model must be specified.').notEmpty();
    req.checkBody('prod_year', 'Prod year must be specified.').notEmpty(); 
    req.checkBody('plate_number', 'Plate number must be specified.').notEmpty();
    req.checkBody('category', 'Category must be specified.').notEmpty();

    req.sanitize('make').escape();
    req.sanitize('model').escape();
    req.sanitize('prod_year').escape();
    req.sanitize('plate_number').escape();
    req.sanitize('category').escape();

    req.sanitize('make').trim();     
    req.sanitize('model').trim();
    req.sanitize('prod_year').trim();     
    req.sanitize('plate_number').trim();
    req.sanitize('category').trim();


    var errors = req.validationErrors();
    
    var fleet = new Fleet(
      { make: req.body.make, 
        model: req.body.model, 
        prod_year: req.body.prod_year,
        plate_number: req.body.plate_number,
        category: req.body.category
       });
       
    if (errors) {
        res.json({fleet: fleet, errors: errors });
        return;
    } 
    else {
        fleet.save(function (err) {
            if (err) { return next(err); }
               res.json(fleet);
            });
    }
});

router.get('/:id', function(req, res, next) {
    Fleet.findById(req.params.id)
        .exec(function (err, single_fleet) {
            if (err) { return next(err); }
            res.json({ contact: single_fleet });
        });
});

router.get('/', function(req, res, next) {
    Fleet.find({})
        .exec(function (err, list_fleets) {
            if(err) { return next(err); }
            res.json(list_fleets);
        })
});

router.put('/:id/update', function(req, res, next) {
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    req.checkBody('make', 'Make must be specified.').notEmpty(); 
    req.checkBody('model', 'Model must be specified.').notEmpty();
    req.checkBody('prod_year', 'Prod year must be specified.').notEmpty(); 
    req.checkBody('plate_number', 'Plate number must be specified.').notEmpty();
    req.checkBody('category', 'Category must be specified.').notEmpty();

    req.sanitize('make').escape();
    req.sanitize('model').escape();
    req.sanitize('prod_year').escape();
    req.sanitize('plate_number').escape();
    req.sanitize('category').escape();

    req.sanitize('make').trim();     
    req.sanitize('model').trim();
    req.sanitize('prod_year').trim();     
    req.sanitize('plate_number').trim();
    req.sanitize('category').trim();


    var errors = req.validationErrors();
    
    var fleet = new Fleet(
      { make: req.body.make, 
        model: req.body.model, 
        prod_year: req.body.prod_year,
        plate_number: req.body.plate_number,
        category: req.body.category,
        _id: req.params.id
       });
       
    if (errors) {
        res.json({fleet: fleet, errors: errors });
        return;
    } 
    else {
        Fleet.findByIdAndUpdate(req.params.id, fleet, {}, function (err) {
            if (err) { return next(err); }
            res.json(fleet);
        });
    }
});

router.delete('/:id/delete', function(req, res, next) {
    Fleet.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send({message: 'Deleted successfully!'});
    })
});

module.exports = router;