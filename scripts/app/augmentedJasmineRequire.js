require.config({
	"baseUrl": "scripts/",

	"paths": {
		'jquery': '../node_modules/jquery/dist/jquery.min',
		'underscore': '../node_modules/underscore/underscore-min',
		'backbone': '../node_modules/backbone/backbone-min',

		'augmented': '../node_modules/augmentedjs/scripts/core/augmented',
		'augmentedPresentation': 'presentation/augmentedPresentation',

		"jasmine": "../node_modules/jasmine-core/lib/jasmine-core/jasmine",
		"jasmine_html": "../node_modules/jasmine-core/lib/jasmine-core/jasmine-html",
		"boot": "../node_modules/jasmine-core/lib/jasmine-core/boot"
        //"jasmineajax": "lib/mock-ajax"
	},
	"shim": {
		jasmine: {
			exports: "window.jasmineRequire"
		},
		jasmine_html: {
			deps: [ "jasmine" ],
			exports: "window.jasmineRequire"
		},
		boot: {
			deps: [ "jasmine", "jasmine_html" ],
			exports: "window.jasmineRequire"
		}/*,
        jasmineajax: {
            deps: [ "jasmine" ],
            exports: "jasmine-ajax"
        }*/
	}
});

//Define all of your specs here. These are RequireJS modules.
var specs = [ "presentation/test/presentationSpec",
              "presentation/test/autoTableSpec",
              "presentation/test/applicationSpec",
              "presentation/test/mediationSpec",
              "presentation/test/decoratorViewSpec",
              "presentation/test/DOMSpec",
              "presentation/test/widgetSpec",
              "presentation/test/viewControllerSpec",
              "presentation/test/dialogSpec",
              "presentation/test/autoFormSpec",
              "presentation/test/dollar"
            ];

// Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
// AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it"s initializers to `window.onload()`. Because
// we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
// initialize the HTML Reporter and execute the environment.
require(["augmented", "augmentedPresentation", "boot"], function(Augmented) {
    "use strict";
    var app = new Augmented.Presentation.Application("Jasmine Suite");
    app.registerStylesheet("https://fonts.googleapis.com/css?family=Roboto:400,300|Roboto+Condensed|Roboto+Mono");
    app.start();

    Augmented.Presentation.Dom.setValue("h2#augmented",
        "<span class=\"version\">Version " + Augmented.Presentation.VERSION +
        " (" + Augmented.codename + ")</span>&emsp;<span class=\"release\">Release (" +
        Augmented.releasename + ")</span>");

	// Load the specs
	require(specs, function() {
		// Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
		window.onload();
	});
});
