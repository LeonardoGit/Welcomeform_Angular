import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({

  beforeModel: function() {
    if(config.customerId) {
      // Get the right customerId form widget setup and render the right form
      //this.transitionTo('form', config.customerId);
      this.transitionTo('form');
    }
  },

  actions: {
    // On error redirect to notfound page.
    error: function (error, transition) {
      this.transitionTo('notfound');
      //Bubble up action
      return true;
    }
  }
});
