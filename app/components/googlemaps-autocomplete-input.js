/* globals Pikaday, moment, google */

/*
  Add script:
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false&libraries=places"></script>

  Example usage:
    <div class="wpf-form-row">
      <div class="wpf-section wpf-group expenses_on_visitor" id="{{form.expenses_on_visitor.id}}">
        <div class="wpf-col wpf-span-6-of-6">
          {{googlemaps-autocomplete-input}}
        </div>
      </div>
    </div>
*/

import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'text',
  classNames: ['wpf-input', 'wpf-googlemaps-autocomplete-input'],
  location: null,

  onInit: function() {
    var that = this;
    var options = {
      componentRestrictions: {country: 'gr'}
    };
    var autocomplete = new google.maps.places.Autocomplete(this.$()[0], options);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      
      if(place && place.geometry && place.geometry.location) {
        Ember.set(that, 'location', place);
      } else {
        //console.error('[Googlemaps-autocomplete-input] Invalid location');
      }
    });
  }.on('didInsertElement'),

  keyPress: function (e) {
    if (e.which === 13) {
      return false;
    }
  },

  onDestroy: function() {
    
  }.on('willDestroyElement'),

  actions: {
    focus: function() {
      Ember.set(this, 'location', null);
    }
  }
});
