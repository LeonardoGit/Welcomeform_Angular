import Ember from "ember";
/*global moment*/

export default Ember.Helper.helper(function(price){
  return new Ember.Handlebars.SafeString('€ ' + price + '.00');
});
