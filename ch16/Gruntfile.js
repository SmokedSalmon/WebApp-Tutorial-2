module.exports = function(grunt){

	// load plugins
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-exec',
		'grunt-contrib-less',
		'grunt-contrib-uglify',
		'grunt-contrib-cssmin',
		'grunt-hashres',
		'grunt-lint-pattern',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});

	// configure plugins
	grunt.initConfig({
		cafemocha: {
			all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
		},
		jshint: {
			app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
			qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
		},
		exec: {
			linkchecker: { cmd: 'linkchecker --ignore-url=\'!^(https?:)\/\/localhost\b\' --ignore-url=/cart/add --no-warnings http://localhost:3000' }
		},
                // Defines the "static" helper for LESS to map static content in CSS
		less: {
			development: {
				options: {
					customFunctions: {
						static: function(lessObject, name) {
							return 'url("' +
								require('./lib/static.js').map(name.value) +
								'")';
						}
					}
				},
				files: {
					'public/css/main.css': 'less/main.less',
					'public/css/cart.css': 'less/cart.less',
				}
			}
		},
                // bundle & minify all static javaScript files. ** in path means
                // recursively search all subfolders
		uglify: {
			all: {
				files: {
					'public/js.min/meadowlark.min.js': ['public/js/**/*.js']
				}
			}
		},
                // bundle & minify all css files
		cssmin: {
			combine: {
                                // note the 2nd element of the array with exclamation
                                // says not to circularly include css files it generates
				files: {
					'public/css/meadowlark.css': ['public/css/**/*.css',
					'!public/css/meadowlark*.css']
				}
			},
			minify: {
				src: 'public/css/meadowlark.css',
				dest: 'public/css/meadowlark.min.css',
			},
		},
                // Defines the which files to fingerprint, on what format, and the
                // destination to update those new file name to.
                // In this case, it choses 'config.js' as the staging point because
                // that is where those files are waiting to be injecting to view context.
		hashres: {
			options: {
				fileNameFormat: '${name}.${hash}.${ext}'
			},
			all: {
				src: [
					'public/js.min/meadowlark.min.js',
					'public/css/meadowlark.min.css',
				],
				dest: [
					'config.js',
				]
			},
		},
                
                // Defines patterns for static resource mapping error
                // In specific, it scans regex pattern in <link>, <script> and
                // <img> tags in the view(view_statics), and all the pre-compile
                // CSS files in LESS format (css_statics)
		lint_pattern: {
			view_statics: {
				options: {
					rules: [
						{
							pattern: /<link [^>]*href=["'](?!\{\{|(https?:)?\/\/)/,
							message: 'Un-mapped static resource found in <link>.'
						},
						{
							pattern: /<script [^>]*src=["'](?!\{\{|(https?:)?\/\/)/,
							message: 'Un-mapped static resource found in <script>.'
						},
						{
							pattern: /<img [^>]*src=["'](?!\{\{|(https?:)?\/\/)/,
							message: 'Un-mapped static resource found in <img>.'
						},
					]
				},
                                files: {
                                        src: [ 'views/**/*.handlebars' ]
                                }
                        },
                        css_statics: {
                                options: {
                                        rules: [
                                                {
                                                        pattern: /url\(/,
                                                        message: 'Un-mapped static found in LESS property.'
                                                },
                                        ]
                                },
                                files: {
                                        src: [
                                                'less/**/*.less'
                                        ]
                                }
                        }
                }
	});	

	// register tasks
        // Adds pattern-linting for static resource mapping error
	grunt.registerTask('default', ['cafemocha','jshint','exec', 'lint_pattern']);
        // define the grunt task for static content processing
	grunt.registerTask('static', ['less', 'cssmin', 'uglify', 'hashres']);
};
