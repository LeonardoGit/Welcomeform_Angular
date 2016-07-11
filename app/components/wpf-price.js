import Ember from 'ember';

function animate_price(){
  if(typeof(this.$('#wpf-estimate-price')) === "undefined"){
    return;
  }
  this.$('#wpf-estimate-price').animateNumber({ number: this.get("price") });
}
export default Ember.Component.extend({
  tagName: "span",
  classNames: ["wpf-price-in-btn", "wpf-center"],
  label: function(){
    if(typeof(this.get("form.first_way_rates.distance_in_km")) === "undefined" && 
    typeof(this.get("form.second_way_rates.distance_in_km"))){
      return "FLAT";
    }else if(typeof(this.get("form.first_way_rates.distance_in_km")) !== "undefined" &&
    typeof(this.get("form.second_way_rates.distance_in_km")) !== "undefined"){
      var km = 0;
      km += this.get("form.first_way_rates.distance_in_km");
      if(this.get("form.is_return_selected")){
        km += this.get("form.second_way_rates.distance_in_km"); 
      }
      return km.toFixed(0)+" KM";
    }else{
      return "TOTAL";
    }
  }.property("form.first_way_rates", "form.second_way_rates"),
  set_price: function(){
    Ember.run.debounce(this, animate_price, 150);
  }.observes("price")
});
