import Ember from "ember";

export default Ember.Object.extend({

  /*********************************************************************
    Mandatory fields for Shopify api 
  **********************************************************************/

  return_to: null, // Shopify form data
  shopify_variant: null, // The shopify product variant that matches with the form total price
  form_action: null, // Form action


  /********************************************************************* 
    Form fields
  **********************************************************************/
  
  // For analytics
  crm_page_url: {
    id: 'input_crm_page_url',
    name: 'properties[crm_page_url]',
    value: ''
  },
  crm_utm_campaign: {
    id: 'input_crm_utm_campaign',
    name: 'properties[crm_utm_campaign]',
    value: ''
  },
  crm_utm_source: {
    id: 'input_crm_utm_source',
    name: 'properties[crm_utm_source]',
    value: ''
  },
  crm_utm_medium: {
    id: 'input_crm_utm_medium',
    name: 'properties[crm_utm_medium]',
    value: ''
  },
  

  force_price_refresh: 0,
  fetching_rates: false,
  // The text for submit button
  submit_btn_text: 'Book now',

  /* Layout form fields */
  form_title: null,
  expenses_on_visitor: null,
  booking_type: null,

  /* Dynamic form fields */
  first_way: null,
  second_way: null,
  email: null,
  full_name: null,
  bnb_key_code: null,
  traveler_comment: null,
  coupon_field: null,


  /********************************************************************* 
    Usefull form objects. Used for holding form fields related values.
  **********************************************************************/
  
  // Coupon object
  coupon: null,
  total_coupon_discount: 0, // This is for coupon_cost hidden field

  // This is for the first way (aller)
  first_selected_from_transfer: null,
  first_selected_to_transfer: null,

  // This is for the second way (retour)
  second_selected_from_transfer: null,
  second_selected_to_transfer: null,

  // Set day or night labels, based on selected timespan
  first_way_timespan_label: '',
  second_way_timespan_label: '',

  // These are for first_way_time calculation. first_way_time value comes from the combination of first_way_time_hour + first_way_time_minute in proper format (ex 08:30)
  //first_way_time_hour: null,
  first_way_time_minute: null,
  first_way_time: null,
  
  // These are for second_way_time calculation. second_way_time value comes from the combination of second_way_time_hour + second_way_time_minute in proper format (ex 08:30)
  //second_way_time_hour: null,
  second_way_time_minute: null,
  second_way_time: null,

  // Default pickup and dropoff prices are 0
  pickup_transfer_price: 0,
  dropoff_transfer_price: 0,

  // This prices are without vehicles multipliers and coupon discounts.
  standard_pickup_transfer_price: 0,
  standard_dropoff_transfer_price: 0,

  // total_transfer_price = pickup_transfer_price + dropoff_transfer_price
  total_transfer_price: 0,

  // The total form price which depends on 4 factors
  //form_total_price: 0,

  // If people are more than 4, the price raises for each 4 more
  first_way_passengers_multiplier: 1,
  second_way_passengers_multiplier: 1,


  /*********************************************************************
    USEFULL COMPUTED PROPERTIES
  **********************************************************************/

  // Compute booking type
  is_pickup_selected: Ember.computed.equal('booking_type.value', 1),
  is_dropoff_selected: Ember.computed.equal('booking_type.value', 2),
  is_pickup_dropoff_selected: Ember.computed.equal('booking_type.value', 3),
  is_return_selected: false,
  // First way / Second way fields visibility
  show_first_way_fields: Ember.computed.or('is_pickup_selected', 'is_pickup_dropoff_selected'),
  show_second_way_fields: Ember.computed.or('is_dropoff_selected', 'is_pickup_dropoff_selected'),

  // User coupon
  form_has_coupons: Ember.computed.notEmpty('coupons'),
  user_has_coupons: Ember.computed.notEmpty('coupon'),

  // Coupon type
  fixed_discount_coupon: Ember.computed.equal("coupon.fixed_discount", true),

  // Coupon value alias
  coupon_value: Ember.computed.alias("coupon.value"),

  hide_save_comission: Ember.computed.equal("crm_distributor_comission.value", 0),

  // Check if user has selected both pickup and destination point, for each way (first and second)
  has_selected_first_tranfer: Ember.computed.and('first_selected_from_transfer.value', 'first_selected_to_transfer.value'),
  has_selected_second_tranfer: Ember.computed.and('second_selected_from_transfer.value', 'second_selected_to_transfer.value'),

  // Check when to show price info
  show_price_info: Ember.computed.or('has_selected_first_tranfer', 'has_selected_second_tranfer', 'user_has_coupons'),


  // First way custom address
  show_first_way_custom_addresses_fields: Ember.computed.or('show_first_way_from_custom_address', 'show_first_way_to_custom_address'),
  show_first_way_from_custom_address: Ember.computed.equal('first_selected_from_transfer.value', 'City Address'),
  show_first_way_to_custom_address: Ember.computed.equal('first_selected_to_transfer.value', 'City Address'),

  // Second way custom address
  show_second_way_custom_addresses_fields: Ember.computed.or('show_second_way_from_custom_address', 'show_second_way_to_custom_address'),
  show_second_way_from_custom_address: Ember.computed.equal('second_selected_from_transfer.value', 'City Address'),
  show_second_way_to_custom_address: Ember.computed.equal('second_selected_to_transfer.value', 'City Address'),


  // First way custom address
  show_first_way_flight_because_of_from: Ember.computed.equal('first_selected_from_transfer.value', 'Athens Airport'),
  show_first_way_flight_because_of_to: Ember.computed.equal('first_selected_to_transfer.value', 'Athens Airport'),
  show_first_way_flight: Ember.computed.or('show_first_way_flight_because_of_from', 'show_first_way_flight_because_of_to'),
  disabled_first_way_flight: Ember.computed.not('show_first_way_flight'),
  
  // Second way custom address
  show_second_way_flight_because_of_from: Ember.computed.equal('second_selected_from_transfer.value', 'Athens Airport'),
  show_second_way_flight_because_of_to: Ember.computed.equal('second_selected_to_transfer.value', 'Athens Airport'),
  show_second_way_flight: Ember.computed.or('show_second_way_flight_because_of_from', 'show_second_way_flight_because_of_to'),
  disabled_second_way_flight: Ember.computed.not('show_second_way_flight'),

  first_way_is_airport: function(){
    if(this.get("first_selected_from_transfer.type") === "Port"){
      return false;
    }
    return this.get("first_selected_to_transfer.type") === "Airport" || this.get("first_selected_from_transfer.type") === "Airport"
  }.property("first_selected_to_transfer", "first_selected_from_transfer"),
  first_way_is_port: function(){
    if(this.get("first_selected_from_transfer.type") === "Airport"){
      return false;
    }
    return this.get("first_selected_from_transfer.type") === "Port" || this.get("first_selected_to_transfer.type") === "Port";
  }.property("first_selected_to_transfer", "first_selected_from_transfer"),
  first_way_time_label: function(){
    if(this.get("first_way_is_airport")){
      if(this.get("first_selected_to_transfer.type") === "Airport"){
        return "Dep. Flight "+ this.get("first_way.time.label");
      }else{
        return "Arrival Flight "+ this.get("first_way.time.label");
      }
    }else if(this.get("first_way_is_port")){
      if(this.get("first_selected_to_transfer.type") === "Port"){
        return "Ferry Dep. "+ this.get("first_way.time.label");
      }else{
        return "Ferry Arrival "+ this.get("first_way.time.label");
      }
    }else{
      return this.get("first_way.time.label");
    }
  }.property("first_way_is_airport", "first_way_is_port"),
  first_way_date_label: function(){
    if(this.get("first_way_is_airport")){
      if(this.get("first_selected_to_transfer.type") === "Airport"){
        return "Dep. Flight "+ this.get("first_way.date.label");
      }else{
        return "Arrival Flight "+ this.get("first_way.date.label");
      }
    }else if(this.get("first_way_is_port")){
      if(this.get("first_selected_to_transfer.type") === "Port"){
        return "Ferry Dep. "+ this.get("first_way.date.label");
      }else{
        return "Ferry Arrival "+ this.get("first_way.date.label");
      }
    }else{
      return this.get("first_way.date.label");
    }
  }.property("first_way_is_airport", "first_way_is_port"),

  first_way_flight_number_label: function(){
      if(this.get("first_selected_to_transfer.type") === "Airport"){
        return "Dep. "+ this.get("first_way.flight_number.label");
      }else{
        return "Arrival "+ this.get("first_way.flight_number.label");
      }
  }.property("first_way_is_airport", "first_way_is_port"),
  
  first_way_ferry_number_label: function(){
      if(this.get("first_selected_to_transfer.type") === "Port"){
        return "Dep. "+ this.get("first_way.ferry_number.label");
      }else{
        return "Arrival "+ this.get("first_way.ferry_number.label");
      }
  }.property("first_way_is_airport", "first_way_is_port"),

  first_way_span: function(){
    if(this.get("first_way_is_airport") || this.get("first_way_is_port")){
      return "wpf-span-2-of-6";
    }else{
      return "wpf-span-3-of-6";
    };
  }.property("first_way_is_airport", "first_way_is_port"),
  

  second_way_is_airport: function(){
    if(this.get("second_selected_from_transfer.type") === "Port"){
      return false;
    }

    return this.get("second_selected_to_transfer.type") === "Airport" || this.get("second_selected_from_transfer.type") === "Airport";
  }.property("second_selected_to_transfer", "second_selected_from_transfer"),
  second_way_is_port: function(){
    if(this.get("second_selected_from_transfer.type") === "Airport"){
      return false;
    }

    return this.get("second_selected_from_transfer.type") === "Port" || this.get("second_selected_to_transfer.type") === "Port";
  }.property("second_selected_to_transfer", "second_selected_from_transfer"),
  second_way_time_label: function(){
    if(this.get("second_way_is_airport")){
      if(this.get("second_selected_to_transfer.type") === "Airport"){
        return "Dep. Flight "+ this.get("second_way.time.label");
      }else{
        return "Arrival Flight "+ this.get("second_way.time.label");
      }
    }else if(this.get("second_way_is_port")){
      if(this.get("second_selected_to_transfer.type") === "Port"){
        return "Ferry Dep. "+ this.get("second_way.time.label");
      }else{
        return "Ferry Arrival "+ this.get("second_way.time.label");
      }
    }else{
      return this.get("second_way.time.label");
    }
  }.property("second_way_is_airport", "second_way_is_port"),
  second_way_date_label: function(){
    if(this.get("second_way_is_airport")){
      if(this.get("second_selected_to_transfer.type") === "Airport"){
        return "Dep. Flight "+ this.get("second_way.date.label");
      }else{
        return "Arrival Flight "+ this.get("second_way.date.label");
      }
    }else if(this.get("second_way_is_port")){
      if(this.get("second_selected_to_transfer.type") === "Port"){
        return "Ferry Dep. "+ this.get("second_way.date.label");
      }else{
        return "Ferry Arrival "+ this.get("second_way.date.label");
      }
    }else{
      return this.get("second_way.date.label");
    }
  }.property("second_way_is_airport", "second_way_is_port"),

  second_way_flight_number_label: function(){
      if(this.get("second_selected_to_transfer.type") === "Airport"){
        return "Dep. "+ this.get("second_way.flight_number.label");
      }else{
        return "Arrival "+ this.get("second_way.flight_number.label");
      }
  }.property("second_way_is_airport", "second_way_is_port"),
  second_way_ferry_number_label: function(){
      if(this.get("second_selected_to_transfer.type") === "Port"){
        return "Dep. "+ this.get("second_way.ferry_number.label");
      }else{
        return "Arrival "+ this.get("second_way.ferry_number.label");
      }
  }.property("second_way_is_airport", "second_way_is_port"),
  second_way_span: function(){
    if(this.get("second_way_is_airport") || this.get("second_way_is_port")){
      return "wpf-span-2-of-6";
    }else{
      return "wpf-span-3-of-6";
    };
  }.property("second_way_is_airport", "second_way_is_port"),

  _first_way_from: function(){
    if(this.get("first_selected_from_transfer.google_autocomplete")){
      this.set("first_way.from_name.value", this.get("first_selected_from_transfer.full_address"));
    }else{
      this.set("first_way.from_name.value", this.get("first_selected_from_transfer.title"));
    }
    this.set("first_way.from_location_id.value", this.get("first_selected_from_transfer.id"));
    this.set("first_way.from_latlng.value", this.get("first_selected_from_transfer.latitude")+","+
    this.get("first_selected_from_transfer.longitude"));
    this.set("second_selected_to_transfer", this.get("first_selected_from_transfer"));
  }.observes("first_selected_from_transfer"),
  _first_way_to: function(){
    if(this.get("first_selected_to_transfer.google_autocomplete")){
      this.set("first_way.to_name.value", this.get("first_selected_to_transfer.full_address"));
    }else{
      this.set("first_way.to_name.value", this.get("first_selected_to_transfer.title"));
    }
    this.set("first_way.to_location_id.value", this.get("first_selected_to_transfer.id"));
    this.set("first_way.to_latlng.value", this.get("first_selected_to_transfer.latitude")+","+
    this.get("first_selected_to_transfer.longitude"));
    this.set("second_selected_from_transfer", this.get("first_selected_to_transfer"));
  }.observes("first_selected_to_transfer"),
  
  _second_way_from: function(){
    if(this.get("second_selected_from_transfer.google_autocomplete")){
      this.set("second_way.from_name.value", this.get("second_selected_from_transfer.full_address"));
    }else{
      this.set("second_way.from_name.value", this.get("second_selected_from_transfer.title"));
    }
    this.set("second_way.from_location_id.value", this.get("second_selected_from_transfer.id"));
    this.set("second_way.from_latlng.value", this.get("second_selected_from_transfer.latitude")+","+
    this.get("second_selected_from_transfer.longitude"));
  }.observes("second_selected_from_transfer"),
  _second_way_to: function(){
    if(this.get("second_selected_to_transfer.google_autocomplete")){
      this.set("second_way.to_name.value", this.get("second_selected_to_transfer.full_address"));
    }else{
      this.set("second_way.to_name.value", this.get("second_selected_to_transfer.title"));
    }
    this.set("second_way.to_location_id.value", this.get("second_selected_to_transfer.id"));
    this.set("second_way.to_latlng.value", this.get("second_selected_to_transfer.latitude")+","+
    this.get("second_selected_to_transfer.longitude"));
  }.observes("second_selected_to_transfer"),

  _first_way_rates: function(){
    var that = this;
    if(this.get("first_selected_from_transfer.id") === null || this.get("first_selected_to_transfer.id") === null ||
      typeof(this.get("first_selected_from_transfer.id")) === "undefined" || typeof(this.get("first_selected_to_transfer.id")) === "undefined"){

      if(this.get("first_selected_from_transfer.google_autocomplete") === true || this.get("first_selected_to_transfer.google_autocomplete") === true){
        this._first_way_rates_km();
        return;
      }else{
        return;
      }
    }
    /*
    window.loadRates = function(data) {
      if(typeof(data[0]) === "undefined" || data[0] === null){
        that.set("first_way_rates",  that.get("default_rates"));
      } else if (data[0].drivers_cost_day === null || data[0].drivers_cost_night === null || 
      data[0].travelers_cost_day === null || data[0].travelers_cost_night === null){
        that.set("first_way_rates",  that.get("default_rates"));
      }else{
        that.set("first_way_rates", data[0]);
      }
    }*/
    this.set("fetching_rates", true);
    jQuery.ajax({
      url: "http://crm.welcomepickups.com/routeprices.json",
      dataType: "jsonp",
      tryCount : 0,
      retryLimit : 3,
      timeout: 5000,
      data: {
        from_location_id: this.get("first_selected_from_transfer.id"),
        to_location_id: this.get("first_selected_to_transfer.id")
      },
      success: function(data){
        if(typeof(data[0]) === "undefined" || data[0] === null){
          that.set("first_way_rates",  that.get("default_rates"));
        } else if (data[0].drivers_cost_day === null || data[0].drivers_cost_night === null || 
         data[0].travelers_cost_day === null || data[0].travelers_cost_night === null){
          that.set("first_way_rates",  that.get("default_rates"));
        }else{
          that.set("first_way_rates", data[0]);
        }
        that.set("fetching_rates", false);
      },
      error: function(xhr, textStatus, errorThrown){
        console.error(xhr, textStatus, errorThrown)
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
          $.ajax(this);
          return;
        }            
        return;
        that.set("fetching_rates", false);
      }
    });
  }.observes("first_selected_from_transfer", "first_selected_to_transfer"),
  
  _second_way_rates: function(){
    var that = this;
    if(this.get("second_selected_from_transfer.id") === null || this.get("second_selected_to_transfer.id") === null ||
      typeof(this.get("second_selected_from_transfer.id")) === "undefined" || typeof(this.get("second_selected_to_transfer.id")) === "undefined"){
      if(this.get("second_selected_from_transfer.google_autocomplete") === true || this.get("second_selected_to_transfer.google_autocomplete") === true){
        this._second_way_rates_km();
        return;
      }else{
        return;
      }
    }
    /*
    window.loadRates = function(data) {
      if(typeof(data[0]) === "undefined" || data[0] === null){
        that.set("second_way_rates",  that.get("default_rates"));
      } else if (data[0].drivers_cost_day === null || data[0].drivers_cost_night === null || 
      data[0].travelers_cost_day === null || data[0].travelers_cost_night === null){
        that.set("second_way_rates",  that.get("default_rates"));
      }else{
        that.set("second_way_rates", data[0] || that.get("default_rates"));
      }
    }*/
    this.set("fetching_rates", true);
    jQuery.ajax({
      url: "http://crm.welcomepickups.com/routeprices.json",
      dataType: "jsonp",
      tryCount : 0,
      retryLimit : 3,
      timeout: 5000,
      data: {
        from_location_id: this.get("second_selected_from_transfer.id"),
        to_location_id: this.get("second_selected_to_transfer.id")
      },
      success: function(data){
        if(typeof(data[0]) === "undefined" || data[0] === null){
          that.set("second_way_rates",  that.get("default_rates"));
        } else if (data[0].drivers_cost_day === null || data[0].drivers_cost_night === null || 
        data[0].travelers_cost_day === null || data[0].travelers_cost_night === null){
          that.set("second_way_rates",  that.get("default_rates"));
        }else{
          that.set("second_way_rates", data[0] || that.get("default_rates"));
        }
        that.set("fetching_rates", false);
      },
      error: function(xhr, textStatus, errorThrown){
        console.error(xhr, textStatus, errorThrown)
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
          //console.log("call again")
          $.ajax(this);
          return;
        }            
        that.set("fetching_rates", false);
        return;
      }
    });
  }.observes("second_selected_from_transfer", "second_selected_to_transfer"),

  set_first_way_traveler_cost: function(){
    var time = this.get("first_way_time_hour.value");
    if(typeof(this.get("first_way.passengers.value")) === "undefined" ||
    typeof(this.get("first_way_rates")) === "undefined" || 
    typeof(time) === "undefined" ||
    this.get("first_selected_to_transfer") === null ||
    this.get("first_selected_from_transfer") === null){

      this.set("first_way.traveler_cost.value", 0);
      return;
    }
    var day_or_night = this.get("first_way_day_or_night");
    var multiplier = Math.max(this.get("first_way.passengers.value")/4, this.get("first_way.luggage.value")/4);
    this.set("first_way.traveler_cost.value",
    Math.ceil(multiplier)*this.get("first_way_rates.travelers_cost_"+day_or_night)+this.get("crm_distributor_comission.value"));
  }.observes("first_way_rates", "first_way.passengers.value", "first_way_time_hour", "first_selected_from_transfer", "first_selected_to_transfer", "force_price_refresh", "first_way.luggage.value"),

  set_first_way_driver_cost: function(){
    var time = this.get("first_way_time_hour.value");
    if(typeof(this.get("first_way.passengers.value")) === "undefined" ||
    typeof(this.get("first_way_rates")) === "undefined" || 
    typeof(time) === "undefined" ){

      this.set("first_way.traveler_cost.value", 0);
      return;
    }
    var day_or_night = this.get("first_way_day_or_night");
    var multiplier = Math.max(this.get("first_way.passengers.value")/4, this.get("first_way.luggage.value")/4);
    this.set("first_way.driver_cost.value",
      Math.ceil(multiplier)*this.get("first_way_rates.drivers_cost_"+day_or_night));
  }.observes("first_way_rates", "first_way.passengers.value", "first_way_time_hour", "first_selected_from_transfer", "first_selected_to_transfer", "force_price_refresh", "first_way.luggage.value" ),

  set_second_way_traveler_cost: function(){
    //console.log("In Second Way traveler")
    var time = this.get("second_way_time_hour.value");
    if(typeof(this.get("first_way.passengers.value")) === "undefined" ||
    typeof(this.get("second_way_rates")) === "undefined" || 
    this.get("second_selected_to_transfer") === null ||
    this.get("second_selected_from_transfer") === null){

      this.set("second_way.traveler_cost.value", 0);
      return;
    }
    var day_or_night = this.get("second_way_day_or_night");
    var multiplier = Math.max(this.get("first_way.passengers.value")/4, this.get("first_way.luggage.value")/4);
    this.set("second_way.traveler_cost.value",
    Math.ceil(multiplier)*this.get("second_way_rates.travelers_cost_"+day_or_night));
    //console.log("Second Way traveler, price set", this.get("second_way.traveler_cost.value"))
  }.observes("second_way_rates", "second_way_time_hour", "second_selected_from_transfer", "second_selected_to_transfer", "force_price_refresh"),

  set_second_way_driver_cost: function(){
    var time = this.get("second_way_time_hour.value");
    if(typeof(this.get("first_way.passengers.value")) === "undefined" ||
    typeof(this.get("second_way_rates")) === "undefined" || 
    typeof(time) === "undefined" ){

      this.set("second_way.driver_cost.value", 0);
      return;
    }
    var day_or_night = this.get("second_way_day_or_night");
    var multiplier = Math.max(this.get("first_way.passengers.value")/4, this.get("first_way.luggage.value")/4);
    this.set("second_way.driver_cost.value",
      Math.ceil(multiplier)*this.get("second_way_rates.drivers_cost_"+day_or_night));
  }.observes("second_way_rates", "second_way_time_hour","second_selected_from_transfer", "second_selected_to_transfer", "force_price_refresh"),

  first_way_day_or_night: function(){
    var time = this.get("first_way_time_hour.value");
    if(!time.isValid()){
      return "day";
    }
    var minutes = time.hours()*60+time.minutes();

    var offset = 0;
    if(this.get("first_way_is_airport")){
      if(this.get("first_selected_from_transfer.type") == "Airport"){
        offset =  this.get("price_timespans.offsets.airport.arrival");
      }else{
        offset =  this.get("price_timespans.offsets.airport.departure");
      }
    }else if(this.get("first_way_is_port")){
      if(this.get("first_selected_from_transfer.type") == "Port"){
        offset =  this.get("price_timespans.offsets.port.arrival");
      }else{
        offset =  this.get("price_timespans.offsets.port.departure");
      }
    }

    var night_start = moment(this.get("price_timespans.night.start"), "HH:mm");
    var night_end = moment(this.get("price_timespans.night.end"), "HH:mm").add(offset, "minutes");
    var minutes_start = night_start.hours()*60+night_start.minutes();
    var minutes_start_with_offset = night_start.add(offset, "minutes").hours()*60+night_start.add(offset, "minutes").minutes();
    var minutes_end_with_offset = night_end.hours()*60+night_end.minutes();

    if(minutes_start_with_offset > minutes_end_with_offset){
      if(minutes >= minutes_start_with_offset || (minutes >= minutes_start && minutes <= minutes_end_with_offset)){
        return "night";
      }else{
        return "day";
      }
    }else
    if(minutes >= minutes_start && minutes <= minutes_end_with_offset){
      return "night";
    }else{
      return "day";
    }
  }.property("first_way_is_port", "first_way_is_airport", "first_selected_from_transfer.type", "first_selected_to_transfer.type", "first_way_time_hour.value"),
  second_way_day_or_night: function(){
    var time = this.get("second_way_time_hour.value");
    if(!time.isValid()){
      return "day";
    }
    var minutes = time.hours()*60+time.minutes();

    var offset = 0;
    if(this.get("second_way_is_airport")){
      if(this.get("second_selected_from_transfer.type") == "Airport"){
        offset =  this.get("price_timespans.offsets.airport.arrival");
      }else{
        offset =  this.get("price_timespans.offsets.airport.departure");
      }
    }else if(this.get("second_way_is_port")){
      if(this.get("second_selected_from_transfer.type") == "Port"){
        offset =  this.get("price_timespans.offsets.port.arrival");
      }else{
        offset =  this.get("price_timespans.offsets.port.departure");
      }
    }

    var night_start = moment(this.get("price_timespans.night.start"), "HH:mm");
    var night_end = moment(this.get("price_timespans.night.end"), "HH:mm").add(offset, "minutes");
    var minutes_start = night_start.hours()*60+night_start.minutes();
    var minutes_start_with_offset = night_start.add(offset, "minutes").hours()*60+night_start.add(offset, "minutes").minutes();
    var minutes_end_with_offset = night_end.hours()*60+night_end.minutes();

    if(minutes_start_with_offset > minutes_end_with_offset){
      if(minutes >= minutes_start_with_offset || (minutes >= minutes_start && minutes <= minutes_end_with_offset)){
        return "night";
      }else{
        return "day";
      }
    }else
    if(minutes >= minutes_start && minutes <= minutes_end_with_offset){
      return "night";
    }else{
      return "day";
    }
  }.property("second_way_is_port", "second_way_is_airport", "second_selected_from_transfer.type", "second_selected_to_transfer.type", "second_way_time_hour.value"),
  form_total_price: function(){
    var _price = 0;
    if(!isNaN(this.get("first_way.traveler_cost.value")))
      _price += this.get("first_way.traveler_cost.value");

    if(this.get("is_return_selected")){
      if(!isNaN(this.get("second_way.traveler_cost.value")))
        _price += this.get("second_way.traveler_cost.value");
    }
    // Check if user has a coupon
    if (this.get('user_has_coupons')) { //if user has a valid coupon
      if(this.get('fixed_discount_coupon')) { // if coupon has a fixed discount
        this.set('total_coupon_discount', this.get('coupon_value'));
        _price =  _price - this.get('coupon_value');
      } else { // if coupon has a percentage discount
        var _percentage_discount = _price * this.get('coupon_value') / 100;
        this.set('total_coupon_discount', _percentage_discount);
        _price = _price - _percentage_discount;
        //console.log(this.get('fixed_discount_coupon'), this.get('coupon_value'), _percentage_discount, _price)
      }
    }
    _price = _price > 0 ? Math.floor(_price) : 0;
    if(_price > 0){
      this.set("show_price_info", true);
    }
    //console.log("Set form total price", _price, this.get("first_way_day_or_night"));
    return _price;
  }.property("first_way.traveler_cost.value", "second_way.traveler_cost.value", "user_has_coupons", "second_way_rates", "second_way_time_hour", "first_way_rates", "first_way_time_hour", "force_price_refresh"),

  _first_way_rates_km: function(){

    var that = this;
    var from_lat = this.get('first_selected_from_transfer.latitude'),
        from_lng = this.get('first_selected_from_transfer.longitude'),
        to_lat = this.get('first_selected_to_transfer.latitude'),
        to_lng = this.get('first_selected_to_transfer.longitude');

    if(from_lat && from_lng && to_lat && to_lng){
      
      var from_lat_lng = new google.maps.LatLng(from_lat, from_lng);
      var to_lat_lng = new google.maps.LatLng(to_lat, to_lng);
      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix({
        origins: [from_lat_lng],
        destinations: [to_lat_lng],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
      }, function (response, status) {
        var distance_in_km = (response.rows[0].elements[0].distance.value / 1000).toFixed(2);
        distance_in_km = Math.round(distance_in_km * 1000) / 1000;
        var day_price = (distance_in_km * that.get('distance_fares.day.kilometer_price')) + that.get('distance_fares.day.fixed_price');
        var night_price = (distance_in_km * that.get('distance_fares.night.kilometer_price')) + that.get('distance_fares.night.fixed_price');

        day_price = day_price > 0 ? Math.floor(day_price) : 0;
        night_price = night_price > 0 ? Math.floor(night_price) : 0;
        that.set("first_way_rates", {
          "drivers_cost_day": day_price,
          "drivers_cost_night": night_price,
          "travelers_cost_day": day_price+5,
          "travelers_cost_night": night_price+5,
          "distance_in_km": distance_in_km
        }),
        console.log(distance_in_km, that.get("first_way_rates"));
      });
    }
  },
  _second_way_rates_km: function(){

    var that = this;
    var from_lat = this.get('second_selected_from_transfer.latitude'),
        from_lng = this.get('second_selected_from_transfer.longitude'),
        to_lat = this.get('second_selected_to_transfer.latitude'),
        to_lng = this.get('second_selected_to_transfer.longitude');

    if(from_lat && from_lng && to_lat && to_lng){
      
      var from_lat_lng = new google.maps.LatLng(from_lat, from_lng);
      var to_lat_lng = new google.maps.LatLng(to_lat, to_lng);
      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix({
        origins: [from_lat_lng],
        destinations: [to_lat_lng],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
      }, function (response, status) {
        var distance_in_km = (response.rows[0].elements[0].distance.value / 1000).toFixed(2);
        distance_in_km = Math.round(distance_in_km * 1000) / 1000;
        var day_price = (distance_in_km * that.get('distance_fares.day.kilometer_price')) + that.get('distance_fares.day.fixed_price');
        var night_price = (distance_in_km * that.get('distance_fares.night.kilometer_price')) + that.get('distance_fares.night.fixed_price');

        day_price = day_price > 0 ? Math.floor(day_price) : 0;
        night_price = night_price > 0 ? Math.floor(night_price) : 0;
        that.set("second_way_rates", {
          "drivers_cost_day": day_price,
          "drivers_cost_night": night_price,
          "travelers_cost_day": day_price+5,
          "travelers_cost_night": night_price+5,
          "distance_in_km": distance_in_km
        }),
        console.log(distance_in_km, that.get("second_way_rates"));
      });
    }
  },



  /*********************************************************************
    FORM LOGIC 
  **********************************************************************/

  on_init: function() {
    // Get url params for analytics.
    this.set('crm_page_url.value', window.location.href );
    this.set('crm_utm_campaign.value', this.get_url_parameter('utm_campaign'));
    this.set('crm_utm_source.value', this.get_url_parameter('utm_source'));
    this.set('crm_utm_medium.value', this.get_url_parameter('utm_medium'));
  }.on('init'),

  // Total form price calculation based on the 4 factors (1.pickup_transfer_price 2.dropoff_transfer_price 3.coupon 4.passengers count)
  set_form_total_price: function() {
    // If charges are not on user, always the price is 0.
    if(this.get('expenses_on_visitor.visible') && this.get('expenses_on_visitor.value')) {
      this.set('form_total_price', 0);
      return;
    }

    var _price = 0,
        _booking_type = this.get('booking_type.value');

    // Get the right total transfer price based on each case: 1.only pickup 2.only dropoff 3. both of them
    if(_booking_type === 1) {
      _price = this.get('pickup_transfer_price');
    } else if(_booking_type === 2) {
      _price = this.get('dropoff_transfer_price');
    } else if(_booking_type === 3) {
      _price = this.get('pickup_transfer_price') + this.get('dropoff_transfer_price');
    }

    // Check if user has a coupon
    if (this.get('user_has_coupons')) { //if user has a valid coupon
      if(this.get('fixed_discount_coupon')) { // if coupon has a fixed discount
        this.set('total_coupon_discount', this.get('coupon_value'));
        _price =  _price - this.get('coupon_value');
      } else { // if coupon has a percentage discount
        var _percentage_discount = _price * this.get('coupon_value') / 100;
        this.set('total_coupon_discount', _percentage_discount);
        _price = _price - _percentage_discount;
      }
    }

    // Round price to the next lower integer
    _price = _price > 0 ? Math.floor(_price) : 0;
    this.set('form_total_price', _price);
  },//.observes('booking_type.value', 'pickup_transfer_price', 'dropoff_transfer_price', 'coupon', 'expenses_on_visitor.value'),

  // Find and calculate pickup price
  set_pickup_transfer_price: function(){
    var _first_selected_from_transfer = this.get('first_selected_from_transfer'),
        _first_selected_to_transfer = this.get('first_selected_to_transfer'),
        _first_way_time_hour = this.get('first_way_time_hour');

    // Help user by setting up return default pickup and dropoff locations, based on initial selections
    // Autocomplete second_selected_to_transfer
    if(_first_selected_from_transfer && !this.get('second_selected_to_transfer')) {
      this.set('second_selected_to_transfer', _first_selected_from_transfer);
    }

    // Autocomplete second_selected_from_transfer
    if(_first_selected_to_transfer && !this.get('second_selected_from_transfer')) {
      this.set('second_selected_from_transfer', _first_selected_to_transfer);
    }

    // Check if we can compute the pickup transfer price else return.
    if(!_first_selected_from_transfer || !_first_selected_to_transfer || !_first_way_time_hour){
      return;
    }

    var that = this,
        _price = 0;

    // Find the right tranfer based on the given locations
    var _prefixed_transfer = this.get('transfers').find(function(transfer) {
      if (transfer.from.replace(/\s/g, "").toLowerCase() === _first_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()  && transfer.to.replace(/\s/g, "").toLowerCase() === _first_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
        return true;
      }
    });
    
    // If we find a prefixed transfer, we will check for the time factor
    if(_prefixed_transfer) {
      var _time = _first_way_time_hour.value,
          _price_timespans = this.get('price_timespans');

      if(_time >= _price_timespans.night.start && _time <= _price_timespans.night.end) {
        _price = _prefixed_transfer.night;
        this.set('first_way_is_night_timespan', true);
      } else {
        _price = _prefixed_transfer.day;
        this.set('first_way_is_night_timespan', false);
      }
    } else {
      _price = 0;
    }

    this.set('standard_pickup_transfer_price', _price);

    // Multiply by passengers multiplier
    _price = _price * this.get('first_way_passengers_multiplier');

    this.set('pickup_transfer_price', _price);
  },
  //.observes('first_selected_from_transfer', 'first_selected_to_transfer', 'first_way_time_hour', 'first_way_passengers_multiplier'),

  // Find and calculate dropoff price
  set_dropoff_transfer_price: function(){
    var _second_selected_from_transfer = this.get('second_selected_from_transfer'),
        _second_selected_to_transfer = this.get('second_selected_to_transfer'),
        _second_way_time_hour = this.get('second_way_time_hour');

    // Check if we can compute the dropoff transfer price else return.
    if(!_second_selected_from_transfer || !_second_selected_to_transfer || !_second_way_time_hour){
      return;
    }

    var that = this,
        _price = 0;

    // Find the right tranfer based on the given locations
    var _prefixed_transfer = this.get('transfers').find(function(transfer) {
      if (transfer.from.replace(/\s/g, "").toLowerCase() === _second_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()  && transfer.to.replace(/\s/g, "").toLowerCase() === _second_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
        return true;
      }
    });
    
    // If we find a prefixed transfer, we will check for the time factor
    if(_prefixed_transfer) {
      var _time = _second_way_time_hour.value,
          _price_timespans = this.get('price_timespans');

      if(_time >= _price_timespans.night.start && _time <= _price_timespans.night.end) {
        _price = _prefixed_transfer.night;
        this.set('second_way_is_night_timespan', true);
      } else {
        _price = _prefixed_transfer.day;
        this.set('second_way_is_night_timespan', false);
      }
    } else {
      _price = 0;
    }

    this.set('standard_dropoff_transfer_price', _price);

    // Multiply by passengers multiplier
    _price = _price * this.get('second_way_passengers_multiplier');

    this.set('dropoff_transfer_price', _price);
  },//.observes('second_selected_from_transfer', 'second_selected_to_transfer', 'second_way_time_hour', 'second_way_passengers_multiplier'),

  // Calculate first way passengers multiplier factor
  set_first_way_passengers_multiplier: function() {
    var _people = this.get('first_way.passengers.value');

    if( _people > 0 && (_people % 4) === 0 ) {
      this.set('first_way_passengers_multiplier', Math.floor(_people/ 4));
    } else if( _people > 4 ) {
      this.set('first_way_passengers_multiplier', Math.floor(_people / 4) + 1);
    } else {
      this.set('first_way_passengers_multiplier', 1);
    }
  }.observes('first_way.passengers.value'),

  // Calculate second way passengers multiplier factor
  set_second_way_passengers_multiplier: function() {
    var _people = this.get('second_way.passengers.value');

    if( _people > 0 && (_people % 4) === 0 ) {
      this.set('second_way_passengers_multiplier', Math.floor(_people/ 4));
    } else if( _people > 4 ) {
      this.set('second_way_passengers_multiplier', Math.floor(_people / 4) + 1);
    } else {
      this.set('second_way_passengers_multiplier', 1);
    }
  }.observes('second_way.passengers.value'),

  set_first_way_time: function(){
    this.set("first_way.time.value", this.get("first_way_time.value"));
  }.observes("first_way_time"),
  
  set_second_way_time: function(){
    //console.log("Set Time", this.get("second_way_time.value"))
    this.set("second_way.time.value", this.get("second_way_time.value"));
  }.observes("second_way_time"),

  // Observe coupon value and check for validity
  set_coupon: function() {
    // Check if we have any coupons for this customer.
    if(this.get('coupons.length')>0) {
      var that = this;
      // Find coupon that matches with user's input
      var _coupon = this.get('coupons').find(function(coupon) {
        if ( String(coupon.code) === String(that.get('coupon_field.value')) ) { 
          return true;
        }
      });

      if(_coupon) {
        this.set('coupon', _coupon);
      } else {
        //console.log('[Debug] Coupon is invalid.');
        if(this.get('coupons')) {
          this.set('coupon', null);
        }
      }
    }
  }.observes('coupon_field.value'),
 
  // Map form_total_price with the right product variant from Shopify product variants
  map_form_price_with_shopify_variant: function() {
    // Check if we have any variants from shopify.
    if(this.get('shopify_variants.length')>0) {
      var that = this;
      // Find variant that matches correctly with form_total_price
      var _variant = this.get('shopify_variants').find(function(variant) {
        // parse each price as float with 2 demical digits (ex 40.00) 
        if (parseFloat(variant.price).toFixed(2) === parseFloat(that.get('form_total_price')).toFixed(2)) { 
          return true;
        }
      });

      if(_variant) {
        // Bind the corrent variant into shopify_variant property.
        this.set('shopify_variant', _variant);
      } else {
        //console.log('[Debug] No shopify variant found.');
        this.set('shopify_variant', null);
      }
    }
  }.observes('form_total_price', 'shopify_variants.[]'),
/*
  // Set first way/second way time values with correct format (ex. 08:30)
  on_first_way_time_hour_or_minute: function() {
    if( this.get('first_way_time_hour') && this.get('first_way_time_minute') ) {
      var _hour = this.get('first_way_time_hour.value');
      var _min = this.get('first_way_time_minute.value');
      _hour = ("0" + _hour).slice(-2); // Apply proper format
      _min = ("0" + _min).slice(-2); // Apply proper format
      this.set('first_way.time.value', _hour + ':' + _min );
    } else {
      this.set('first_way.time.value', '');
    }
  }.observes('first_way_time_hour', 'first_way_time_minute'),

  on_second_way_time_hour_or_minute: function() {
    if( this.get('second_way_time_hour') && this.get('second_way_time_minute') ) {
      var _hour = this.get('second_way_time_hour.value');
      var _min = this.get('second_way_time_minute.value');
      _hour = ("0" + _hour).slice(-2); // Apply proper format
      _min = ("0" + _min).slice(-2); // Apply proper format
      this.set('second_way.time.value', _hour + ':' + _min );
    } else {
      this.set('second_way.time.value', '');
    }
  }.observes('second_way_time_hour', 'second_way_time_minute'),
*/
  first_way_time_hour: function(){
    return {
      value: moment(this.get("first_way.time.value"), "HH:mm")
    };
  }.property("first_way.time.value"),
  second_way_time_hour: function(){
    return {
      value: moment(this.get("second_way.time.value"), "HH:mm")
    };
  }.property("second_way.time.value"),
  // Opt out selected points(pickup and destination) for first way transfers
  filter_first_way_transfers: function() {
    var _first_selected_from_transfer = this.get('first_selected_from_transfer'),
        _first_selected_to_transfer = this.get('first_selected_to_transfer'),
        _first_way_from_transfers = this.get('first_way_from_transfers'),
        _first_way_to_transfers = this.get('first_way_to_transfers'),
        _filtered_results = [];

    if(_first_selected_from_transfer && !this.get('show_first_way_from_custom_address')) {
      // Opt out from filtered_first_way_to_transfers the _first_selected_from_transfer value
      _filtered_results = _first_way_to_transfers.filter(function(item, index, self) {
        if (item.value.replace(/\s/g, "").toLowerCase() !== _first_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()) { 
          return true; 
        }
      });

      this.set('filtered_first_way_to_transfers', _filtered_results);

      // Also check _first_selected_to_transfer value and opt out this one from filtered_first_way_from_transfers
      if(_first_selected_to_transfer && !this.get('show_first_way_to_custom_address')) {
        _filtered_results = _first_way_from_transfers.filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _first_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_first_way_from_transfers', _filtered_results);
      } else if(_first_selected_to_transfer && this.get('show_first_way_to_custom_address')){
        _filtered_results = this.get('first_way_to_transfers').filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _first_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_first_way_to_transfers', _filtered_results);
        this.set('filtered_first_way_from_transfers', _first_way_from_transfers);
      }
    } else if(_first_selected_from_transfer && this.get('show_first_way_from_custom_address')) {
      this.set('filtered_first_way_to_transfers', _first_way_to_transfers);
    }

    if(_first_selected_to_transfer && !this.get('show_first_way_to_custom_address')) { 
      _filtered_results = this.get('first_way_from_transfers').filter(function(item, index, self) {
        if (item.value.replace(/\s/g, "").toLowerCase() !== _first_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
          return true; 
        }
      });

      this.set('filtered_first_way_from_transfers', _filtered_results);

      // Also check _first_selected_from_transfer value and opt out this one from filtered_first_way_to_transfers
      if(_first_selected_from_transfer && !this.get('show_first_way_from_custom_address')) {
        _filtered_results = this.get('first_way_to_transfers').filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _first_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_first_way_to_transfers', _filtered_results);
      } else if(_first_selected_from_transfer && this.get('show_first_way_from_custom_address')){
        _filtered_results = _first_way_from_transfers.filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _first_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_first_way_from_transfers', _filtered_results);
        this.set('filtered_first_way_to_transfers', _first_way_to_transfers);
      }
    } else if(_first_selected_to_transfer && this.get('show_first_way_to_custom_address')) { 
      this.set('filtered_first_way_from_transfers', _first_way_from_transfers);
    }
  }.observes('first_selected_from_transfer', 'first_selected_to_transfer'),
  // Opt out selected points(pickup and destination) for second way transfers
  filter_second_way_transfers: function() {
    var _second_selected_from_transfer = this.get('second_selected_from_transfer'),
        _second_selected_to_transfer = this.get('second_selected_to_transfer'),
        _second_way_from_transfers = this.get('second_way_from_transfers'),
        _second_way_to_transfers = this.get('second_way_to_transfers'),
        _filtered_results = [];

    if(_second_selected_from_transfer && !this.get('show_second_way_from_custom_address')) {
      // Opt out from filtered_second_way_to_transfers the _second_selected_from_transfer value
      _filtered_results = _second_way_to_transfers.filter(function(item, index, self) {
        if (item.value.replace(/\s/g, "").toLowerCase() !== _second_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()) { 
          return true; 
        }
      });

      this.set('filtered_second_way_to_transfers', _filtered_results);

      // Also check _second_selected_to_transfer value and opt out this one from filtered_second_way_from_transfers
      if(_second_selected_to_transfer && !this.get('show_second_way_to_custom_address')) {
        _filtered_results = _second_way_from_transfers.filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _second_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_second_way_from_transfers', _filtered_results);
      } else if(_second_selected_to_transfer && this.get('show_second_way_to_custom_address')){
        _filtered_results = _second_way_to_transfers.filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _second_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_second_way_to_transfers', _filtered_results);
        this.set('filtered_second_way_from_transfers', _second_way_from_transfers);
      }
    } else if(_second_selected_from_transfer && this.get('show_second_way_from_custom_address')) {
      this.set('filtered_second_way_to_transfers', _second_way_to_transfers);
    }

    if(_second_selected_to_transfer && !this.get('show_second_way_to_custom_address')) {
      _filtered_results = _second_way_from_transfers.filter(function(item, index, self) {
        if (item.value.replace(/\s/g, "").toLowerCase() !== _second_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
          return true; 
        }
      });

      this.set('filtered_second_way_from_transfers', _filtered_results);

      // Also check _second_selected_from_transfer value and opt out this one from filtered_second_way_to_transfers
      if(_second_selected_from_transfer && !this.get('show_second_way_from_custom_address')) {
        _filtered_results = this.get('second_way_to_transfers').filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _second_selected_from_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_second_way_to_transfers', _filtered_results);
      } else if(_second_selected_from_transfer && this.get('show_second_way_from_custom_address')){
        _filtered_results = _second_way_from_transfers.filter(function(item, index, self) {
          if (item.value.replace(/\s/g, "").toLowerCase() !== _second_selected_to_transfer.value.replace(/\s/g, "").toLowerCase()) { 
            return true; 
          }
        });

        this.set('filtered_second_way_from_transfers', _filtered_results);
        this.set('filtered_second_way_to_transfers', _second_way_to_transfers);
      }
    } else if(_second_selected_to_transfer && this.get('show_second_way_to_custom_address')) { 
      this.set('filtered_second_way_from_transfers', _second_way_from_transfers);
    }
  }.observes('second_selected_from_transfer', 'second_selected_to_transfer'),

  get_url_parameter: function(param) {
    var _page_url = window.location.search.substring(1);
    if(_page_url) {
      var _url_variables = _page_url.split('&');
      for (var i = 0; i < _url_variables.length; i++)  {
        var _parameter_name = _url_variables[i].split('=');
        if (_parameter_name[0] === param) {
          return _parameter_name[1].split('/')[0]; // Removes the / from the end
        }
      }
    }
  }

});


