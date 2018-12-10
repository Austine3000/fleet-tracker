var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var FleetSchema = new Schema(
    {
        make: {type: String, required: true, max: 100},
        model: {type: String, required: true, max: 100},
        prod_year: {type: Date, required: true},
        plate_number: {type: String, required: true, max: 100},
        category: {type: String, required: true, enum: ['CAR', 'TRUCK', 'TRAILER'], default: 'CAR'}
    }
);

module.exports = mongoose.model('Fleet', FleetSchema);