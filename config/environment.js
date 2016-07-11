/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'welcome-pickups-form',
    environment: environment,
    baseURL: '/',
    rootElement: '#welcome-pickups-form-root-element',
    city: "Athens",
    city_time_zone: "Europe/Athens",
    location_id: 508,
    distributor_key: "some key",
    autocheck_return_trip: false,
    commission_fee:0,
    return_to: "pages/athens-welcome-beyond-the-essentials",
    form_action: "//www.welcomepickups.com/cart/add",
    calendar_min_date_threshold_hours: 2,
    //calendar_min_date_threshold: 2,
    common_prices: [
    {from: "Athens Airport", to: "City Center",  day: 38,  night: 54},
    {from: "Athens Airport", to: "Piraeus Port",  day: 54,  night: 70},
    {from: "Athens Airport", to: "Lavrio Port",  day: 55,  night: 76},    
    {from: "Athens Airport", to: "Rafina Port",  day: 40,  night: 55},        
    {from: "Piraeus Port", to: "City Center",  day: 25,  night: 38},
    {from: "Rafina Port", to: "City Center",  day: 44,  night: 65},    
    {from: "Lavrio Port", to: "City Center",  day: 65,  night: 87}
    ],
    price_table_with_comission: true,
    //Only 4 will be shown
    quick_options: [
      { id: 1, title: "Athens Airport", type: "Airport", full_address: "Athens Airport"},
      { id: 849, title: "Piraeus Port", type: "Port", full_address: "Piraeus Port"},
      { id: 850, title: "Rafina Port", type: "Port", full_address: "RafinaP Port"},
      { id: 851, title: "Lavrio Port", type: "Port", full_address: "Lavrio Port"},      
    ],

    pathPrefix: "/",
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.locationType = 'auto';
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.airbrake = {
      projectId:  '116768',
      projectKey: 'c6f3dd43b6b97be91bf12c1483b55e31'
    };
    ENV.locationType = 'none';
  }

  return ENV;
};
