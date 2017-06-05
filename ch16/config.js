/*
 * Configuration file for the project, written in JavaScript
 * It is common to write it in JSON, and conveniently include it using
 * " require('./config.json') " trick.
 */
module.exports = {
	// For the use of 'connect-bundle' module, to switch the use of 2 sets of
        // static js/css files. Original ones for development, bundled & minified
        // for production.
        bundles: {
		clientJavaScript: {
			main: {
				// Fingerprinted and updated  by "grunt-contrib-harshres"
                                // NOT manually
                                file: '/js.min/meadowlark.min.9b77d847.js',
				location: 'head',
				contents: [
					'/js/contact.js',
					'/js/cart.js',
				]
			}
		},
		clientCss: {
			main: {
				// Fingerprinted and updated  by "grunt-contrib-harshres"
                                // NOT manually
                                file: '/css/meadowlark.min.2a8883cf.css',
				contents: [
					'/css/main.css',
					'/css/cart.css',
				]
			}
		},
	},
}
