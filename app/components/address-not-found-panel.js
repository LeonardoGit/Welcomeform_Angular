/* globals Pikaday, moment */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['wpf-address-not-found-panel'],
  classNameBindings: ['visible::wpf-hidden'],

  actions: {
    // Send action up to form route.
    closePanel: function() {
      this.sendAction();
      this.get("autocomplete").set("edit_mode", true);
    },
    select_address: function(){
    if(typeof(this.get("location.name")) == "undefined"){
      this.get("autocomplete").set("edit_mode", true);
      this.sendAction();
    }else{
      var obj = Ember.Object.create({
        title: this.get("location.formatted_address"),
        full_address: this.get("location.formatted_address"),
        latitude: this.get("location.geometry.location.G"),
        longitude: this.get("location.geometry.location.K")
      });
      this.get("autocomplete").send("selectItem", obj);
      this.sendAction();
      }
    },
  }
});

