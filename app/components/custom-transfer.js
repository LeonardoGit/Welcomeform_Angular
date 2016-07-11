/* globals Pikaday, moment, google */

/*

  Example usage:

  {{custom-transfer fares=form.distance_fares day_custom_transfer_price=form.first_custom_transfer_day_price night_custom_transfer_price=first_custom_transfer_night_price}}

*/

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'wpf-custom-transfer',
  first_location: null,
  second_location: null,

  onInit: function() {
    
  }.on('didInsertElement'),

  onLocationSelect: function() {
    var first_lat = this.get('first_location.geometry.location.A'),
        first_lng = this.get('first_location.geometry.location.F'),
        second_lat = this.get('second_location.geometry.location.A'),
        second_lng = this.get('second_location.geometry.location.F');
/*
    if(first_lat) {
      console.info('First location name: ' + this.get('first_location.name') + ' - Lat: '+ first_lat + ' / Lng: '+ first_lng);
    }
    if(second_lat) {
      console.info('Second location name: ' + this.get('second_location.name') + ' / Lat: '+ second_lat + ' / Lng: '+ second_lng);
    }
  */  
    if(first_lat && first_lng && second_lat && second_lng) {

      var that = this;
      var first_lat_lng = new google.maps.LatLng(first_lat, first_lng);
      var second_lat_lng = new google.maps.LatLng(second_lat, second_lng);
      var distanceService = new google.maps.DistanceMatrixService();

      distanceService.getDistanceMatrix({
        origins: [first_lat_lng],
        destinations: [second_lat_lng],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
      }, function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          //console.log('Error:', status);
        } else {
          //console.log(response);
          var distance_in_km = (response.rows[0].elements[0].distance.value / 1000).toFixed(2);
          distance_in_km = Math.round(distance_in_km * 1000) / 1000;
          var day_price = (distance_in_km * that.get('fares.day.kilometer_price')) + that.get('fares.day.fixed_price');
          var night_price = (distance_in_km * that.get('fares.night.kilometer_price')) + that.get('fares.night.fixed_price');
          
          day_price = day_price > 0 ? Math.floor(day_price) : 0;
          night_price = night_price > 0 ? Math.floor(night_price) : 0;

         // console.info('Distance: '+ distance_in_km +' km / Day price: € '+day_price+' / Night price: € '+night_price);

          that.set('distance_in_km', distance_in_km);
          that.set('day_custom_transfer_price', day_price);
          that.set('night_custom_transfer_price', night_price);
        }
      });
    }
  }.observes('first_location', 'second_location'),

  onDestroy: function() {
    this.set('first_location', null);
    this.set('second_location', null);
  }.on('willDestroyElement')
});
