import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  // This is the only route our app needs. All forms will be rendered here based on a given :customer_id.
  this.route('form', { path: '/' });

  // Error page
//  this.resource('notfound', { path: "/" });
});
