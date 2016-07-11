/* globals Pikaday, moment */
//import CommonPrices from '../objects/CommonPrices';

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['wpf-transfer-prices-table'],
  classNameBindings: ['visible::wpf-hidden'],
  data: function(){
    var that = this;
    //return CommonPrices[this.get("city")]
    return this.get("common_prices")
    .map(function(item){
      item = Ember.Object.create(item);
      if(that.get("price_table_with_comission")){
        item.incrementProperty("day",that.get("commission_fee")); 
        item.incrementProperty("night",that.get("commission_fee")); 
      }
      return item;
    });
  }.property("common_prices"),

  actions: {
    // Send action up to form route.
    closePanel: function() {
      this.sendAction();
    }
  }
});
