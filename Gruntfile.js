// Generated on 2015-01-30 using
// generator-webapp 0.5.1
'use strict';

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var config = require('./config');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config.config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.static %>/scripts/{,*/}*.js', '<%= config.shareApp %>/scripts/{,*/}*.js'],
        //tasks: ['jshint'],
        //options: {
        //  livereload: true
        //}
      },
      jstest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['test:watch']
      },
      gruntfile: {
        files: ['Gruntfile.js', 'config.js']
      },
      compass: {
        files: ['<%= config.static %>/scss/{,*/}*.{scss,sass}',
          '<%= config.shareApp %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:dev']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.distStatic %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },    
    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.static %>/scripts/{,*/}*.js',
        '!<%= config.static %>/scripts/vendor/{,*/}*.js',
        '!<%= config.static %>/scripts/lib/zepto.js',
        '!<%= config.static %>/scripts/platform/{,*/}*.js'
      ]
    },
    compass: {
      options: {
        require: [
          'compass/import-once/activate'
        ],
        relativeAssets: true
      }, // Task
      dist: { // Target
        options: {
          // httpPath: '',
          sassDir: ['<%= config.static %>/scss'],
          cssDir: '<%= config.static %>/styles',
          imagesDir: '<%= config.static %>/images',
          spriteLoadPath: '<%= config.static %>/images',
          environment: 'production'
        }
      },
      dev: { // Another target
        options: {
          // httpPath: '',
          sassDir: '<%= config.static %>/scss',
          cssDir: '<%= config.static %>/styles',
          imagesDir: '<%= config.static %>/images',
          spriteLoadPath: '<%= config.static %>/images'
        }
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.static %>/{,*/}*.html', '<%= config.static %>/view/{,*/}*.html'],
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js']
      },
      sass: {
        src: ['<%= config.static %>/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Renames files for browser caching purposes
    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'sha512',
        length: 8
      },
      dist: {
        files: {
          src: [
            '<%= config.distStatic %>/scripts/{,*/}*.js',
            '<%= config.distStatic %>/styles/{,*/}*.css',
            '<%= config.distStatic %>/images/{,*/}*.*',
            '<%= config.distStatic %>/styles/fonts/{,*/}*.*',
            '<%= config.distStatic %>/*.{ico,png}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.distStatic %>'
      },
      html: ['<%= config.static %>/{,*/}*.html', '<%= config.static %>/view/{,*/}*.html']
      //html: ['<%= config.app %>/index.html','<%= config.dist %>/view/{,*/}*.html']
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.distStatic %>',
          '<%= config.distStatic %>/images',
          '<%= config.distStatic %>/styles'
        ]
      },
      html: ['<%= config.distStatic %>/{,*/}*.html', '<%= config.distStatic %>/view/{,*/}*.html'],
      css: ['<%= config.distStatic %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.static %>/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.distStatic %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.static %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.distStatic %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseBooleanAttributes: false,
          collapseWhitespace: true,
          conservativeCollapse: false,
          removeAttributeQuotes: false,
          removeCommentsFromCDATA: false,
          removeEmptyAttributes: true,
          removeOptionalTags: false,
          removeRedundantAttributes: false,
          useShortDoctype: false
        },
        files: [{
          expand: true,
          cwd: '<%= config.distStatic %>',
          src: ['{,*/}*.html', 'view/{,*/}*.html'],
          dest: '<%= config.distStatic %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    cssmin: {
      options: {
        // compatibility: 'ie8',
        //keepSpecialComments: '*' //保持特殊的评论
        //rebase: false
        roundingPrecision: -1
      }
      //   dist: {
      //     files: {
      //       '<%= config.dist %>/styles/main.css': [
      //         '.tmp/styles/{,*/}*.css',
      //         '<%= config.app %>/styles/{,*/}*.css'
      //       ]
      //     }
      //   }
    },
    purifycss: {
      options: {},
      //target: {
      //  cwd: '<%= config.static %>',
      //  src: ['<%= config.static %>/{,*/}*.html', '<%= config.static %>/scripts/**/*.js'],
      //  css: ['<%= config.static %>/styles/{,*/}*.css'],
      //  dest: '<%= config.distStatic %>/styles/purestyles.css'
      //}
    },
    uglify: {
      options: {
        compress: {
          'drop_debugger': true,
          'drop_console': true
        },
        ASCIIOnly: true
      }
      // dist: {
      //   files: {
      //     '<%= config.dist %>/scripts/scripts.js': [
      //       '<%= config.dist %>/scripts/scripts.js'
      //     ]
      //   }
      // }
    },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.static %>',
          dest: '<%= config.distStatic %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '{,*/}*.html',
            'view/{,*/}*.html',
            'data/{,*/}*.json',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= config.distStatic %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.static %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        //'sass:server',
        'compass:dev',
        'copy:styles',
        //'typescript'
      ],
      // test: [
      //   'copy:styles'
      // ],
      dist: [
        //'sass',
        'compass:dist',
        // 'purifycss',
        'copy:styles',
        'imagemin',
        'svgmin',
        //'typescript'
      ]
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= config.static %>/{,*/}*.html',
            '<%= config.static %>/styles/**/*.css',
            '<%= config.static %>/scripts/**/*.js',
            '<%= config.static %>/images/**/*',
            '<%= config.shareApp %>/scripts/**/*.js'
          ]
        },
        options: {
          //open: false,
          port: 80,
          watchTask: true,
          //server: './app',
          //proxy: 'localhost/site1',
          server: {
            baseDir: ['<%= config.app %>', '.tmp']
          },
          ui: {
            port: 8080
          }
        }
      },
      dist: {
        bsFiles: {
          src: [
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/{,*/}*.html',
            '<%= config.dist %>/view/{,*/}*.html',
            '<%= config.dist %>/scripts/{,*/}*.js'
          ]
        },
        options: {
          port: 80,
          server: {
            baseDir: ['<%= config.dist %>']
          },
          ui: {
            port: 8080
          }
        }
      }
    }
  });

  grunt.registerTask('sync', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'browserSync:dev',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    // 'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
