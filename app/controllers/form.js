import Ember from "ember";
import TimeOptions from '../objects/TimeOptions';
/* globals $ */

export default Ember.Controller.extend({
  steps: ['step-1', 'step-2', 'step-3'],
  current_step: 'step-1',
  form_is_valid: true,

  is_coupon_visible: false, // Toggle coupon field visibility
  is_price_info_visible: false, // Toggle price info visibility
  is_transfer_prices_table_visible: false, // Toggle transfer prices table visibility
  is_address_not_found_visible: false, // Toggle address not found visibility
  required_field: true, // Assign this value in required properties that need to be true (basic for selectize plugin)
/*
  // Hours array for hours select component
  hours: [
    {text: '0', value: 0},{text: '1', value: 1},{text: '2', value: 2},{text: '3', value: 3},{text: '4', value: 4},{text: '5', value: 5},{text: '6', value: 6},{text: '7', value: 7},{text: '8', value: 8},{text: '9', value: 9},{text: '10', value: 10},{text: '11', value: 11},{text: '12', value: 12},{text: '13', value: 13},{text: '14', value: 14},{text: '15', value: 15},{text: '16', value: 16},{text: '17', value: 17},{text: '18', value: 18},{text: '19', value: 19},{text: '20', value: 20},{text: '21', value: 21},{text: '22', value: 22},{text: '23', value: 23}
  ],

  // Minutes array for minutes select component
  minutes: [
    {text: '00', value: 0},{text: '05', value: 5},{text: '10', value: 10},{text: '15', value: 15},{text: '20', value: 20},{text: '25', value: 25},{text: '30', value: 30},{text: '35', value: 35},{text: '40', value: 40},{text: '45', value: 45},{text: '50', value: 50},{text: '55', value: 55}
  ],
*/
  times: function(){
    return TimeOptions;
  }.property(),
  // Passengers array for passengers select component
  passengers: [
    {optgroup: 'One vehicle', options: [ 
      {value: 1, text: "1"}, {value: 2, text: "2"}, {value: 3, text: "3"}, {value: 4, text: "4"} ]
    },
    {optgroup: 'Two vehicle', options: [ 
      {value: 5, text: "5"}, {value: 6, text: "6"}, {value: 7, text: "7"}, {value: 8, text: "8"} ]
    },
    {optgroup: 'Three vehicle', options: [ 
      {value: 9, text: "9"}, {value: 10, text: "10"}, {value: 11, text: "11"}, {value: 12, text: "12"} ]
    }
  ],

  luggages: [
    {optgroup: 'One vehicle', options: [ 
      {value: 1, text: "1" }, { value: 2, text: "2"}, {value: 3, text: "3"}, {value: 4, text: "4"}]
    },
    {optgroup: 'Two vehicle', options: [ 
      {value: 5, text: "5" }, { value: 6, text: "6"}, {value: 7, text: "7"}, {value: 8, text: "8"}]
    },
    {optgroup: 'Three vehicle', options: [ 
      {value: 9, text: "9" }, { value: 10, text: "10"}, {value: 11, text: "11"}, {value: 12, text: "12"}]
    }
  ],
          
  // Set the right layout path that will be rendered
  form_layout: function() {
    return 'layouts/'+this.get('model.form.layout');
  }.property('model.form.layout'),
  
  // Set the step layout path that will be rendered
  current_step_layout: function() {
    return 'layouts/'+this.get('model.form.layout')+"-"+this.get("current_step");
  }.property('model.form.layout', 'current_step'),

  has_single_location: function(){
    return typeof(this.get("form.single_location")) !== "undefined";
  }.property("form.single_location"),

  // Track actions on form fields. These actions triggers WelcomeForm observers. 
  validate_date: function(){
    // first way
    if(this.get("form.first_way.date.value") !== null && this.get("form.first_way_time") !== null){
      var date = moment(this.get("form.first_way.date.value"));
      var time = this.get("form.first_way_time");
      date.set('hour', parseInt(time.split(":")[0]));
      date.set('minute', parseInt(time.split(":")[1]));
      return date.isAfter(moment().add(this.get("form.calendar_min_date_threshold_hours"), "hour"))
    }
  },
  actions: {
    
    // Set if expenses are on visitor
    toggleExpensesOnVisitor: function(value) {
      this.set('form.expenses_on_visitor.value', value);
    },

    // Set booking type
    toggleBookingType: function(type) {
      this.set('form.booking_type.value', type);
    },

    // Toggle coupon field visibility
    toggleCouponField: function() {
      this.toggleProperty('is_coupon_visible');
      this.set('form.coupon_field.value', ''); // Clear its time field's value
    },

    // Toggle price info visibility
    togglePriceInfo: function() {
      this.toggleProperty('is_price_info_visible');
    },

    // Toggle transfer prices table visibility
    toggleTransferPricesTable: function() {
      this.send('toggleLockForm'); // Send action to lock background, up to form route.
      this.toggleProperty('is_transfer_prices_table_visible');
    },
    
    // Toggle address not found panel visibility
    toggleAddressNotFoundPanel: function(autocomplete) {
      this.set("autocomplete_for_location", autocomplete)
      this.send('toggleLockForm'); // Send action to lock background, up to form route.
      this.toggleProperty('is_address_not_found_panel_visible');
    },

    next_step: function(){
      if(this.get("form.fetching_rates")){
        return;
      }
      if(!this.validate_date()){
        // TODO: Show message
        return;
      }
      if(Ember.$('form.wpf-form').parsley().validate()){
        this.set("form_is_valid", true);
        var index = this.get("steps").indexOf(this.get("current_step"));
        if(index === 0 && !this.get("form.is_return_selected")){
          this.set("current_step", this.get("steps")[index+2]);
        }else if(index < this.get("steps").length){
          this.set("current_step", this.get("steps")[index+1]);
        }
        this.incrementProperty("form.force_price_refresh");
      }else{
        this.set("form_is_valid", false);
      }
    },
    previous_step: function(){
      var index = this.get("steps").indexOf(this.get("current_step"));
      if(index == 2 && !this.get("form.is_return_selected")){
        this.set("current_step", this.get("steps")[0]);
      }else{
        this.set("current_step", this.get("steps")[index-1]);
      }
    }
  }
});
