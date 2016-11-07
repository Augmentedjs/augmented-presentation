require.config({
	'baseUrl': 'scripts/',

    'paths': {
		'jquery': '../../node_modules/jquery/dist/jquery.min',
		'underscore': '../../node_modules/underscore/underscore-min',
		'backbone': '../../node_modules/backbone/backbone-min',

		'augmented': '../../node_modules/augmentedjs/scripts/core/augmented',
		'augmentedPresentation': 'presentation/augmentedPresentation'
	},
	'shim': {}
});

require(
	['backbone', 'augmented', 'underscore'],
	function(Backbone, Augmented, _) {
		var app = new Augmented.Application();
		app.setName("About");
		app.start();

	    $("#augmented").html("Version " + Augmented.VERSION + " (" + Augmented.codename + ") Release " + Augmented.releasename);

	    var libraries = {};
		libraries.jQuery = "jQuery version " + $().jquery;

		var und;
		if (_.lodash) {
			und = 'lodash.js';
		} else {
			und = 'underscore.js';
		}

		libraries.underscore = und + " version " + _.VERSION;
		libraries.backbone = "Backbone.js version " + Backbone.VERSION;
		libraries.require = "Require.js version " + require.version;

		$("#libraries").html("<p>Other base libraries:</p><ul><li>" + libraries.jQuery + "</li><li>" + libraries.underscore +
				"</li><li>" + libraries.backbone + "</li><li>" + libraries.require +
				"</li></ul>");

		console.log("My JS is Augmented! - JC");
    }
);
