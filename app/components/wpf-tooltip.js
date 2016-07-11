import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "span",
  has_tooltip: function(){
    return typeof(this.get("hint")) !== "undefined" && this.get("hint") !== null && this.get("hint") !== "";
  }.property("hint")
});
