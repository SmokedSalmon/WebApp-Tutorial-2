var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        // A combination of authentic strategies and the ID will apply to prevent
        // collisions. For example, user with Facebook login will have a ID like:
        // facebook:986439382
	authId: String,
	name: String,
	email: String,
        // For authorization
	role: String,
	created: Date,
});

var User = mongoose.model('User', userSchema);
module.exports = User;
