import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  classNames: "wpf-price-info",
  vehicles: function(){
    return Math.ceil(this.get("form.first_way.passengers.value")/4);
  }.property("form.first_way.passengers.value"),

  vehicle_label: function(){
    return this.get("vehicles") > 1 ? "Vehicles" : "Vehicle";
  }.property("vehicles"),
  
  passengers_label: function(){
    return this.get("form.first_way.passengers.value") > 1 ? "passengers" : "passenger";
  }.property("form.first_way.passengers.value"),
  km_first_way:function(){
    return this.get("form.first_way_rates.distance_in_km"); 
  }.property("form.first_way_rates"),
  km_second_way:function(){
    return this.get("form.second_way_rates.distance_in_km"); 
  }.property("form.second_way_rates"),
});
