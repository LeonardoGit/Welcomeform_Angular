import Ember from "ember";

export default Ember.Handlebars.makeBoundHelper(function(index){
  return Ember.String.htmlSafe(Number(index)+1);
});