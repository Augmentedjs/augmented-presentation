var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    // then do not normalize the paths
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, "");
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
	"baseUrl": "/base",

	"paths": {
		"jquery": "node_modules/jquery/dist/jquery.min",
		"underscore": "node_modules/underscore/underscore-min",
		"backbone": "node_modules/backbone/backbone-min",
		"augmented": "node_modules/augmentedjs/scripts/core/augmented",
		"augmentedPresentation": "scripts/presentation/augmentedPresentation"
	},
	"shim": {

	},
	// ask Require.js to load these files (all our tests)
    deps: allTestFiles,
	callback: window.__karma__.start
});

//Define all of your specs here. These are RequireJS modules.
var specs = [
              "presentation/test/presentationSpec",
              "presentation/test/autoTableSpec",
              "presentation/test/applicationSpec",
              "presentation/test/mediationSpec",
              "presentation/test/decoratorViewSpec",
              "presentation/test/DOMSpec",
              "presentation/test/widgetSpec",
              "presentation/test/viewControllerSpec",
              "presentation/test/dialogSpec",
              "presentation/test/autoFormSpec",
              "presentation/test/dollarSpec",
              "presentation/test/hamburgerMenuSpec"
            ];
