var mongoose = require('mongoose');

/*
 * This script create a data schema and methods which makes up the Vacation Model
 */
var vacationSchema = mongoose.Schema({
    name: String,
    slug: String,
    category: String,
    sku: String,
    description: String,
    priceInCents: Number,
    tags: [String],
    inSeason: Boolean,
    available: Boolean,
    requiresWaiver: Boolean,
    maximumGuests: Number,
    notes: String,
    packagesSold: Number,
});
vacationSchema.methods.getDisplayPrice = function(){
    return '$' + (this.priceInCents / 100).toFixed(2);
};

// By createing Mongoose's model object, database-level methods are forwarded and
// packed into this model object, so that developer no need to worry about database
// manipulation while during the MVC designing phase
var Vacation = mongoose.model('Vacation', vacationSchema);
module.exports = Vacation;