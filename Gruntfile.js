module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            prod: {
                options: {
                    style: 'compressed',
                },

                files: {
                    "css/biogram.css": "css/scss/biogram/biogram.scss",
                    "css/project.css": "css/scss/project.scss",
                    "css/sections.css": "css/scss/sections.scss",
                    "css/single-article.css": "css/scss/single-article.scss",
                    "css/icons.css": "css/scss/icons.scss",
                    "css/front-page.css": "css/scss/front-page.scss",
                    "css/search-results.css": "css/scss/search-results.scss",
                    "css/landing.css": "css/scss/landing.scss",
                    "css/main.css": "css/scss/main.scss",
                    "css/mydlo.css": "css/scss/mydlo.scss",
                    "css/learning.min.css": "css/scss/learning.scss",
                    "css/centrum-prasowe-filters.min.css": "css/scss/centrum-prasowe-filters.scss",
                    "css/mautic-form.min.css": "css/scss/mautic-form.scss",
                    "css/cp_contact.min.css": "css/scss/cp_contact.scss",
                    "css/centrum-prasowe.css": "css/scss/centrum-prasowe.scss"
                }
            },
        },

        uglify: {
            options: {
                mangle: false,
            },
            prod: {
                files: {
                    "js/dist/mydlo.js": [
                        "js/src/mydlo.js",
                    ],
                    "js/dist/biogram.min.js": [
                        "js/src/biogram.js",
                    ],
                    "js/dist/front-page.min.js": [
                        "js/src/front-page.js",
                    ],
                    "js/dist/project.min.js": [
                        "js/src/project.js",
                    ],
                    "js/dist/sections.min.js": [
                        "js/src/sections.js",
                    ],
                    "js/dist/single-article.min.js": [
                        "js/src/single-article.js",
                    ],
                    "js/dist/main.min.js": [
                        "js/src/main/search.js",
                        "js/src/main/form.js",
                        "js/src/main/navigation.js",
                        "js/src/main.js",
                    ],
                    "js/vendor/bundle.min.js": [
                        "js/vendor/select2.min.js",
                        "js/vendor/jquery.colorbox-min.js",
                        "js/vendor/popper.min.js",
                        "js/vendor/tippy-bundle.umd.min.js",
                        "js/vendor/slick.js",
                        "js/vendor/slick-filter.js",
                        "js/vendor/what-input.min.js",
                    ],
                },
            },
        },

        postcss: {
            options: {
                map: false, // inline sourcemaps
                processors: [
                    require('autoprefixer')(), // add vendor prefixes
                    require('postcss-pxtorem')({
                        rootValue: 16,
                        unitPrecision: 5,
                        propList: ['*', '!border', '!border-left', '!border-right', '!border-top', '!border-bottom'],
                        selectorBlackList: [],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 0,
                    }),
                    require('cssnano')(),
                ]
            },
            biogram: {
                files: {
                    "css/biogram.css": ["css/biogram.css"],
                }
            },
            mydlo: {
                files: {
                    "css/mydlo.css": ["css/mydlo.css"],
                }
            },
            centrum_prasowe: {
                files: {
                    "css/centrum-prasowe-filters.css": ["css/centrum-prasowe-filters.css"],
                }
            },
            learning: {
                files: {
                    "css/learning.css": ["css/learning.css"],
                }
            },
            section: {
                files: {
                    "css/sections.css": ["css/sections.css"],
                }
            },
            article: {
                files: {
                    "css/single-article.css": ["css/single-article.css"],
                }
            },
            project: {
                files: {
                    "css/project.css": ["css/project.css"],
                }
            },
            icons: {
                files: {
                    "css/icons.css": ["css/icons.css"],
                }
            },
            frontpage: {
                files: {
                    "css/front-page.css": ["css/front-page.css"],
                }
            },
            landing: {
                files: {
                    "css/landing.css": ["css/landing.css"],
                }
            },
            searchResults: {
                files: {
                    "css/search-results.css": ["css/search-results.css"],
                }
            },
            main: {
                files: {
                    "css/main.css": ["css/main.css"]
                }
            },
        },

        cmq: {
            options: {
                log: false
            },
            // centrum_prasowe: {
            //     files: {
            //         "css/centrum-prasowe-filters.css": ["css/centrum-prasowe-filters.css"],
            //     }
            // },
            biogram: {
                files: {
                    "css/biogram.css": ["css/biogram.css"],
                }
            },

            section: {
                files: {
                    "css/sections.css": ["css/sections.css"],
                }
            },
            article: {
                files: {
                    "css/single-article.css": ["css/single-article.css"],
                }
            },
            project: {
                files: {
                    "css/project.css": ["css/project.css"],
                }
            },
            frontpage: {
                files: {
                    "css/front-page.css": ["css/front-page.css"],
                }
            },
            landing: {
                files: {
                    "css/landing.css": ["css/landing.css"],
                }
            },
            searchResults: {
                files: {
                    "css/search-results.css": ["css/search-results.css"],
                }
            },
            main: {
                files: {
                    "css/main.css": ["css/main.css"]
                }
            },
        },

        watch: {
            css: {
                files: 'css/**/*.scss',
                // tasks: ['sass']
                tasks: ['sass', 'cmq', 'postcss']
            },
            js: {
                files: ['js/src/**/*.js'],
                tasks: ['uglify']
            },
        },

        browserSync: {
            bsFiles: {
                src: ['css/*.css', '*.php', 'js/dist/*.js']
            },
            options: {
                open: false,
                // browser: ['chrome', 'firefox', 'opera', 'vivaldi'],
                watchTask: false,
                proxy: "localhost/swps1",
                port: 82
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'uglify', 'cmq', 'postcss', 'browserSync', 'watch']);
    grunt.registerTask('doNotWatch', ['sass', 'uglify', 'cmq', 'postcss']);
    grunt.registerTask('css', ['sass', 'cmq', 'postcss']);
    grunt.registerTask('js', ['uglify']);
};