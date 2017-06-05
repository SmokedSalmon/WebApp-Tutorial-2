/* 
 * The credential.js here uses the hard-coded cookie secret, just for demonstation
 * sake, should be ommited from source
 */

module.exports = {
    cookieSecret: 'abcdefghijk',
    // A dummy gmail account for testing
    gmail: {
        user: 'test@gmail.com',
        password: 'test',
    },
    // MongoDB connection string, for development and production mode each
    mongo: {
        development: {
            // We use URI instead of connectionString for local mongoDB, refer to
            // the mongoose API document, which suggest "mongoose.connect(<uri>, <option>)"
            connectionString: 'mongodb://localhost:27017/WebApp_Tutorial2',
        },
        production: {
            connectionString: 'test_production_connection_string',
        },
    },
    // For 3rd-party authentication, in this case we use Facebook strategy and Google
    authProviders: {
        facebook: {
            development: {
                appId: 'jerrysu.jie@gmail.com',
                appSecret: 'test_Secret_String',
            },
        },
        google: {
            development: {
                clientID: 'jerrysu.jie@gmail.com',
                clientSecret: 'test_Secret_String',
            },
        },
    },
};