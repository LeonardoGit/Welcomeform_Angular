import Ember from 'ember';

export default Ember.Component.extend({
  classNames: "wpf-reverse-btn",
  click: function(){
    var way = "first";
    if(this.get("form.first_way.from_name.is_single_location")){
      var tmp = this.get("form.first_selected_to_transfer");
      this.set("form.first_selected_to_transfer", this.get("form.first_selected_from_transfer"));
      this.set("form.first_selected_from_transfer", tmp);
    }else{
      var tmp = this.get("form.first_selected_from_transfer");
      this.set("form.first_selected_from_transfer", this.get("form.first_selected_to_transfer"));
      this.set("form.first_selected_to_transfer", tmp);
    
    }
      this.toggleProperty("form.first_way.from_name.is_single_location");
      this.toggleProperty("form.first_way.to_name.is_single_location");
      this.toggleProperty("form.second_way.from_name.is_single_location");
      this.toggleProperty("form.second_way.to_name.is_single_location");
  }
});
