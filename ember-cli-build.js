/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var env = EmberApp.env();
var isDevelopmentLikeBuild = ['development', 'testing'].indexOf(env) > -1; // Check if we build for development env.

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    autoRun: isDevelopmentLikeBuild,
    emberCliFontAwesome: {
      useScss: true
    },
    fingerprint: {
      enabled: false
    },
    vendorFiles: {
      'jquery.js': {
        production: false,
        development: 'bower_components/jquery/dist/jquery.js'
      }
    },
    outputPaths: {
      app: {
        html: 'index.html',
        css: {
          'app': '/welcome-pickups-form/welcome-pickups-form.css'
        },
        js: '/welcome-pickups-form/welcome-pickups-form.js'
      },
      vendor: {
        css: '/welcome-pickups-form/vendor.css',
        js: '/welcome-pickups-form/vendor.js'
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import("bower_components/normalize.css/normalize.css");
  app.import("bower_components/pikaday/css/pikaday.css");
  app.import("bower_components/intl-tel-input/build/css/intlTelInput.css");

  app.import("bower_components/moment/moment.js");
  app.import("bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js");
  app.import("bower_components/jstimezonedetect/jstz.js");
  app.import("bower_components/pikaday/pikaday.js");
  app.import("bower_components/parsleyjs/dist/parsley.js");
  app.import("bower_components/jquery-animateNumber/jquery.animateNumber.js");
  app.import("bower_components/intl-tel-input/build/js/intlTelInput.js");
  app.import("bower_components/intl-tel-input/lib/libphonenumber/build/utils.js");
  return app.toTree();
};
