module.exports = function(grunt){

	// load plugins
        // use "forEach" to iterate array instead of typing loadNpmTasks repeatly
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// configure plugins
        // Notice the src property takes regex
        // The jshint setting can only include targeted files, not exclude.
        // Use JSHint to lint only your own source, omit 3rd-party libraries, in
        // this case, avoid /node_modules, /public/vendor, /vendor
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
                        // Addindg this fix due to issue jsHint/jsHint#2922
                        options: {
                            reporterOutput: ""
                        }
		},
		exec: {
			linkchecker: { cmd: 'linkchecker http://localhost:3000' }
		},
	});	

	// register tasks
	grunt.registerTask('default', ['cafemocha','jshint','exec']);
};
