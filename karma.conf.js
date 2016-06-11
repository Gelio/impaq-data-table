// Karma configuration
// Generated on Sat Jun 11 2016 22:32:58 GMT+0200 (Środkowoeuropejski czas letni)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'dist/bundle.js',
            'app/**/*.spec.ts',
        ],


        // list of files to exclude
        exclude: [
            'node_modules/*'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.ts': ['typescript']
        },

        /*typescriptPreprocessor: {
            // options passed to typescript compiler
            tsconfigPath: './tsconfig.json', // *obligatory
            compilerOptions: { // *optional
                removeComments: false
            },
            ignorePath: function(path){ // ignore all files that ends with .d.ts (this files will not be served)
                return /\.d\.ts$/.test(path);
            },
            // transforming the filenames
            // you can pass more than one, they will be execute in order
            transformPath: [function(path) { // *optional
                return path.replace(/\.ts$/, '.js');
            }, function(path) {
                return path.replace(/[\/\\]test[\/\\]/i, '/'); // remove directory test and change to /
            }]
        },*/

        typescriptPreprocessor: {
            options: {
                sourceMap: false,
                target: 'ES5',
                module: 'commonjs',
                noImplicitAny: false,
                noResolve: false,
                removeComments: true,
                concatenateOutput: false
            },
            typings: [
                'typings/main.d.ts'
            ],
            transformPath: function(path) {
                return path.replace(/\.ts$/, '.js');
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
