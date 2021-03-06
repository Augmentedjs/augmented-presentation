
// Karma configuration
// Generated on Mon Mar 28 2016 13:22:51 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: ".",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["jasmine", "requirejs"],


    // list of files / patterns to load in the browser
    files: [
    {pattern: "node_modules/augmentedjs/scripts/core/augmented.js", included: false},
    {pattern: "scripts/presentation/augmentedPresentation.js", included: false},
    {pattern: "node_modules/backbone/backbone-min.js", included: false},
    {pattern: "node_modules/underscore/underscore-min.js", included: false},
    {pattern: "node_modules/jquery/dist/jquery.min.js", included: false},
    //{pattern: "scripts/lib/mock-ajax.js", included: false},
    {pattern: "scripts/presentation/test/autoTableSpec.js", included: false},
    {pattern: "scripts/presentation/test/applicationSpec.js", included: false},
    {pattern: "scripts/presentation/test/mediationSpec.js", included: false},
    {pattern: "scripts/presentation/test/presentationSpec.js", included: false},
      {pattern: "test-main.js", included: true}
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress", "junit"],

    // the default configuration
    junitReporter: {
      outputDir: "", // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: "", // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined // function (browser, result) to customize the classname attribute in xml testcase element
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ["PhantomJS"],


    // Which plugins to enable
//    plugins: [
//      "karma-phantomjs-launcher",
//      "karma-jasmine"
//    ],
//
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
