import Ember from "ember";
/*global moment*/

export default Ember.Handlebars.makeBoundHelper(function(price){
  return new Ember.Handlebars.SafeString( price + '.00' + ' €');
});