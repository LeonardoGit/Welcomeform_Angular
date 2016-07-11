import Ember from 'ember';
import config from '../config/environment';
import WelcomeForm from '../objects/WelcomeForm';
import Customers from '../objects/Customers';
import ShopifyProducts from '../objects/ShopifyProducts';
import GA from '../mixins/google-analytics';
import CommonPrices from '../objects/CommonPrices';
/* globals $ */

export default Ember.Route.extend(GA, {
  model: function(params) {
    return Customers;
    /*
    // Set form model which basically is a customer json object
    return new Ember.RSVP.Promise(function(resolve, reject) {
      // Find the right customer based on given customer_id
      var customer = Customers.find(function (customer) {
        return customer.customer_id.toString() === params.customer_id.toString();
      });

      if(customer) {
        resolve(customer);
      } else {
        reject("No valid customer with id => " + params.customer_id);
      }
    });
    */
  },

  afterModel: function(model) {
    Ember.run.next(this,function(){
      // Send pageview event to ga
      this.trackPageView(this.get('router.url')); 
      // Send view event to ga
      this.trackEvent('Welcome-form', 'view', String(config.distributor_key)); 
    });
  },

  setupController: function(controller, model) {
    controller.set('model', model);

    // Create a new WelcomeForm object instance and hold it in controller.form property . This holds all the form fields/logic. See app/objects/WelcomeForm.js
    controller.set('form', WelcomeForm.create(model.form) );

    //Form action data
    controller.set("form.return_to", {value: config["return_to"]});
    controller.set("form.form_action", {value: config["form_action"]});

    //General form info for hidden fields
    controller.set('form.crm_city', {value: config["city"] || "Athens", "name": "properties[crm_city]", "id": "input_crm_city"});
    controller.set('form.crm_distributor', {value: config.distributor_key, "name": "properties[crm_distributor]", "id": "input_crm_distributor",});
    controller.set('form.crm_distributor_type', model.crm_distributor_type);
    controller.set('form.crm_vehicle_type', model.crm_vehicle_type);
    controller.set("form.crm_distributor_comission", {value: config.commission_fee});

    controller.set("form.common_prices", config["common_prices"] || CommonPrices[controller.get("form.crm_city.value")]);
    controller.set("form.price_table_with_comission", config["price_table_with_comission"] || true);

    controller.set("form.is_return_selected", config.autocheck_return_trip);

    controller.set("form.default_rates", model.default_rates);
    controller.set("form.first_way_rates", model.default_rates);
    controller.set("form.second_way_rates", model.default_rates);
    // Set form single location
    if(typeof(config["location_id"]) !== "undefined" && config["location_id"] !== null){
      window.loadLocation = function(data) {
        var location = data[0];
        location.type = location.kind;
        controller.set("form.single_location", location);
        controller.set("form.first_selected_to_transfer", location);
        controller.set("form.second_selected_from_transfer", location);
        controller.set("form.first_way.to_name.is_single_location", true);
        controller.set("form.first_way.from_name.is_single_location", false);
        controller.set("form.second_way.from_name.is_single_location", true);
        controller.set("form.second_way.to_name.is_single_location", false);
        if(location.common_prices.length !== 0){
          controller.set("form.common_prices", location.common_prices);
          }
      }
      jQuery.ajax({
        context: this,
        url: "http://crm.welcomepickups.com/locations.json",
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "loadLocation",
        data: {
          id: config["location_id"],
        }
      });
    }
    
    if(typeof(controller.get("form.single_location")) !== "undefined"){
      controller.set("form.first_way.from_name.value", model.single_location.location_name);
      controller.set("form.first_way.from_location_id.value", model.single_location.location_id);
      
      controller.set("form.second_way.to_name.value", model.single_location.location_name);
      controller.set("form.second_way.to_location_id.value", model.single_location.location_id);
    }
    

    // Set form coupons
    controller.set('form.coupons', model.coupons);

    // Set prefixed form transfers
    controller.set('form.transfers', model.transfers);

    // Set form distance fares
    controller.set('form.distance_fares', model.distance_fares);

    // Set price timespans.
    controller.set('form.price_timespans', model.price_timespans);

    // Set calendar_min_date_threshold for pikaday component.
    controller.set('form.calendar_min_date_threshold_hours', config.calendar_min_date_threshold_hours || 12);
    controller.set('form.city_time_zone', config.city_time_zone);

    // Set quick options
    controller.set("form.quick_options", (config.quick_options||[]).map(function(o){return Ember.Object.create(o);}));

    // Create prefixed transfers arrays. from_transfers_names & to_transfers_names hold just locations names in order to avoid duplications in dropdown selections
    var from_transfers = [],
        from_transfers_names = [],
        to_transfers = [],
        to_transfers_names = [];
/*
    // Set arrays
    model.transfers.forEach(function(transfer, index) {
      if(from_transfers_names.indexOf(transfer.from) === -1) {
        from_transfers_names.push(transfer.from);
        from_transfers.push({
          id: index,
          value: transfer.from
        });
      }
      
      if(to_transfers_names.indexOf(transfer.to) === -1) {
        to_transfers_names.push(transfer.to);
        to_transfers.push({
          id: index,
          value: transfer.to
        });
      }
    });
*/
    // Hold the original transfers arrays in order to reset the filtered ones.
    controller.set('form.first_way_from_transfers', from_transfers);
    controller.set('form.first_way_to_transfers', to_transfers);
    controller.set('form.second_way_from_transfers', from_transfers);
    controller.set('form.second_way_to_transfers', to_transfers);

    // The filtered transfers arrays are used to avoid any conflicts where the pickup location is the same with the destination one.
    controller.set('form.filtered_first_way_from_transfers', from_transfers);
    controller.set('form.filtered_first_way_to_transfers', to_transfers);
    controller.set('form.filtered_second_way_from_transfers', from_transfers);
    controller.set('form.filtered_second_way_to_transfers', to_transfers);

    // Uncomment in order to fetch Shopify products from multiple urls at once.
    /*var that = this,
        shopify_variants = [],
        promises = [
          Ember.$.getJSON('http://cdn.shopify.com/s/files/1/0516/1281/t/5/assets/shopify_athens_product.474043851.json'),
          Ember.$.getJSON('http://cdn.shopify.com/s/files/1/0516/1281/t/5/assets/shopify_athens_product.474043851.json')
        ];
 
    Ember.$.when.apply($, promises).done(function() {
      Ember.$.each(arguments, function( index, products ) {
        Ember.$.merge(shopify_variants, products[0].product.variants);
      });
      that.set('controller.form.shopify_variants', shopify_variants);
    });*/

    // Fetch Shopify products from one url and nerge them with local shopify procucts(variants 100-199).
    /*
    var that = this;
    Ember.$.getJSON('http://cdn.shopify.com/s/files/1/0516/1281/t/5/assets/shopify_athens_product.474043851.json', function(products) {
      Ember.$.merge(ShopifyProducts.product.variants, products.product.variants);
      that.set('controller.form.shopify_variants', ShopifyProducts.product.variants);
    });
    */
    this.set('controller.form.shopify_variants', ShopifyProducts.product.variants);
  },

  actions: {
    toggleLockForm: function() {
      // Place an overlay in order to lock the form
      Ember.$('.wpf-form-box').toggleClass('locked');

      // Close transfer prices table if overlay clicked
      if( this.get('controller.is_transfer_prices_table_visible') ) {
        this.set('controller.is_transfer_prices_table_visible', false);
      }
    }
  }
});
