/* Developed by Akis Volanis */

(function($, undefined) {

  'use strict';

  $.fn.welcomePickupsForm = function(options) {

    var $el = this,
        $options = $.extend({
          modulePrefix: "welcome-pickups-form",
          environment: "production",
          baseURL: "/",
          rootElement: "#welcome-pickups-form-root-element",
          locationType: "none", 
          exportApplicationGlobal: false,
          EmberENV: {
            FEATURES: {
            }
          },
          APP: {name: "welcome-pickups-form", version: "0.0.0.507ca829"},
          airbrake: {
            projectId:  '116768',
            projectKey: 'c6f3dd43b6b97be91bf12c1483b55e31'
          },
          city: null,
          location_id: null,
          commission_fee: 0,
          distributor_key: "",
          calendar_min_date_threshold: 2,
          autocheck_return_trip: false,
          form_action: "//www.welcomepickups.com/cart/add",
          return_to: "pages/athens-welcome-beyond-the-essentials",
          pathPrefix: ''
        }, options);;

    _main();

    function _addHtmlTemplate() {
      var html = '<style> #widget-loader{width:5em;height:5em;margin:auto;margin-top:260px;}#widget-loader-message{color:#888;font-family:"Museo Sans";font-size:12px;font-weight:700;bottom:30%;margin:auto}#lrd1{border:3px solid #ebebeb;border-bottom-color:#6ae2a6;width:75%;height:75%;border-radius:50%;-webkit-font-smoothing:antialiased!important;margin:30px 0;-webkit-animation:spin .5s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}#loader-wrapper{text-align:center;background-color: white;color: #2e3b4e;border-radius: 2px;overflow: hidden;width: 450px;font-family: "Museo Sans"; text-rendering: optimizeLegibility; height:600px; -webkit-font-smoothing: antialiased;} </style>'+
    '<div id="welcome-pickups-form-root-element" width="500px"><div id="loader-wrapper"><div id="widget-loader"><div id="lrd1"></div></div><div id="widget-loader-message">LOADING BOOKING FORM</div></div></div>';
      $el.append(html);
    }

    function _addJS(jsFiles) {
      $.getScript(jsFiles[0], function(){
        $.getScript(jsFiles[1], function(){ // This way makes sure that all dependencies are ok before booting up ember app.
          //console.log('welcome-pickups-form scripts loaded!');
          $('#welcome-pickups-form-root-element #loader-wrapper').remove(); // Remove loader
          require("welcome-pickups-form/app")["default"].create(); // Boot up widget!
        });
      });
    }

    function _addMeta(meta) {
      if(!$('meta[name="welcome-pickups-form/config/environment"]').length) {
        $("head").append(meta);
      }
    }

    function _addCss(cssFiles) {
      cssFiles.forEach(function(value) {
        if(!$('link[href="'+value+'"]').length) {
          var link = '<link href="'+value+'" type="text/css" rel="stylesheet">';
          $("head").append(link);
        }
      });
    }

    function _main() {
      $("head").append('<!-- BEGIN WelcomePickupsForm ASSETS -->');
      var escaped_options = escape(JSON.stringify($options));

      var cssFiles = [$options.pathPrefix + 'welcome-pickups-form/vendor.css', $options.pathPrefix + 'welcome-pickups-form/welcome-pickups-form.css'];
      var jsFiles = [$options.pathPrefix + 'welcome-pickups-form/vendor.js', $options.pathPrefix + 'welcome-pickups-form/welcome-pickups-form.js'];
      var meta = '<meta name="welcome-pickups-form/config/environment" content="'+escaped_options+'">';

      _addHtmlTemplate();
      _addCss(cssFiles);
      _addMeta(meta);
      _addJS(jsFiles);

      $("head").append('<!-- END WelcomePickupsForm ASSETS -->');
    }

    // for chaining
    return $el;
  };
}(jQuery));

