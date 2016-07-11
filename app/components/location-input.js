import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
import KeyCodes from 'ember-cli-auto-complete/utilities/key-codes';
import Ember from 'ember';
var htmlSafe = Ember.String.htmlSafe;


var focusOutEvent;
const VISIBLE = "visible";
const HIDDEN = "hidden";
export default AutoComplete.extend({
  valueProperty: "first_selected_from_transfer",
  options: [],
  triggerSuggestion: 0,
  edit_mode: true,
  selectedFromList: false,
  addressNotFoundAction: "toggleAddressNotFoundPanel",
  default_value: null,
  pull_left: false,
  pull_left_class: function(){
    if(this.get("pull_left")){
      return "wpf-tt-dropdown-menu-pull-left";
    }else{
      return "";
    }
  }.property("pull_left"),
  /*
  address_not_found_location: {
    type: "address-not-found",
    title: "Custom Address",
    full_address: "Input an address manually"
  },
  */
  _init: function(){
    var item = this.get(this.get("form_value"));
    if(typeof(item) !== "undefined" && item !== null){
      this.send("selectItem", item);
    }
    if(this.get("default_value") === null){
      return;
    }
    
    item = this.get(this.get("default_value"));
    if(typeof(item) !== "undefined" && item !== null){
      this.send("selectItem", item);
    }

  }.on("willInsertElement"),
  empty_input: function(){
    return this.get("inputVal") === "" || typeof(this.get("inputVal")) === "undefined";
  }.property("inputVal"),
  fetchOptions: function(){
    if(this.get("inputVal") === null){
      return;
    }
    // Hack needed to implement callback. FIXME: allow random callback name server side
    var that = this;
    window.loadLocations = function(data) {
      if(data.length > 0){
        that.loadLocations(data);
      }
      if(data.length <= 2){
        if(data.length === 0){
          that.loadLocations([]);
        }
        var service = new google.maps.places.AutocompleteService();
        var pservice =  new google.maps.places.PlacesService(that.$("#wpf-sink")[0]);
        if(typeof(that.get('inputVal'))=== "undefined" || that.get('inputVal') === null || that.get('inputVal') === ""){
          return;
        }
        service.getPredictions({ input: that.get('inputVal'), componentRestrictions:{country: 'gr' }}, 
        function(predictions, status){
          if(predictions === null){
            return;
          }
          predictions.slice(0,5).map(function(loc){ 
            pservice.getDetails({placeId: loc.place_id}, function(place, status){
              var duplicate = false;
              if(place === null){
                return;
                }
                var obj = Ember.Object.create({
                id: null,
                title: place.name,
                place_id: place.place_id,
                full_address: place.formatted_address,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng(),
                google_autocomplete: true
              });
              that.get("options").forEach(function(item){
                duplicate = (item.place_id === obj.place_id);
              })
              if(!duplicate){
                if(that.get("options").length < 5){
                that.get("options").pushObject(obj);
                }
              }
            });
          })
        });
      }
    }
    jQuery.ajax({
      context: this,
      url: "http://crm.welcomepickups.com/locations.json",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: "loadLocations",
      data: {
        city: this.get("city"),
        search: this.get("inputVal"),
      }
    });
  }.observes("inputVal"),
  suggestions: function() {
    return this.get("options");
  }.property("triggerSuggestion"),
  quick_options: Ember.computed.alias("form.quick_options"),
  optionsToMatch: function() {
    return this.get("options");
  }.property("options.[]"),
  loadLocations: function(data){
      var that = this;
      var locationList = [];
      data.slice(0,5).map(function(loc){
        locationList.pushObject(Ember.Object.create({
          id: loc.id,
          type: loc.kind,
          title: loc.title,
          full_address: loc.full_address,
          longitude: loc.longitude,
          latitude: loc.latitude
        }));
      });
      /*
      if(locationList.length > 0){
        locationList.pushObject(Ember.Object.create(this.get("address_not_found_location")));
      }
      */
      this.set("options", locationList);
      this.set("triggerSuggestion", new Date());
  },
  click: function(){
    if(this.get("selectedFromList") && this.get("visibility") === "hidden"){
      this.set("edit_mode", true); 
    }
  },
  keyDown: function (event) {
    if (this.get("visibility") !== HIDDEN) {
      if (KeyCodes.keyPressed(event) === "downArrow") {
        this.highlight("down");
      } else if (KeyCodes.keyPressed(event) === "upArrow") {
        this.highlight("up");
      } else if (KeyCodes.keyPressed(event) === "enter" || KeyCodes.keyPressed(event) === "tab") {
        if (!Ember.isBlank(this.selectableSuggestion)) {
          this.send("selectItem", this.selectableSuggestion);
          this.set("visibility", htmlSafe(HIDDEN));
        } else {
          if(this.get("optionsToMatch").length > 0){
            this.send("selectItem", this.get("optionsToMatch")[0]);
            this.set("visibility", htmlSafe(HIDDEN));
          }else{
            var value = this.get("selectedValue");
            var optionsToMatch = this.get("optionsToMatch");
            if (optionsToMatch.indexOf(value) >= 0) {
              this.set("selectedFromList", true);
              this.set("visibility", htmlSafe(HIDDEN));
            }
          }
        }
      }
    } else {
      this.set("visibility", htmlSafe(VISIBLE));
    }
  },
  focusOut: function () {
    clearTimeout(focusOutEvent);
    var self = this;
    var func = function () {
      if (self.isDestroyed) {
        return;
      }
      self.set("visibility", HIDDEN);
      if (!self.get("selectedFromList")) {
        var value = this.get("selectedValue");
        var optionsToMatch = this.get("optionsToMatch");
        if (optionsToMatch.indexOf(value) === -1) {
          self.set("inputVal", "");
          self.set("selectedValue", "");
        }
      }
    };
    focusOutEvent = Ember.run.later(this, func, 200);
  },
  /*
  focusOut: function () {
    clearTimeout(focusOutEvent);
    var self = this;
    var func = function () {
      if (self.isDestroyed) {
        return;
      }
      self.set("visibility", HIDDEN);
      if (!self.get("selectedFromList") ) {
        if(typeof(self.get("inputVal")) !== "undefined" && /\S/.test(self.get("inputVal"))){
          var obj = Ember.Object.create({
            title: self.get("inputVal"),
            full_address: self.get("inputVal"),
            latitude: "",
            longitude: ""
          });
          self.send("selectItem", obj);
        }else{
          self.set("inputVal", "");
          self.set("selectedValue", "");
        }
      }
    };
    focusOutEvent = Ember.run.later(this, func, 200);
  },
  */
  actions: {
   selectItem: function (item) {
     var valueProperty = this.get("valueProperty");
     if(item.get("type") === "address-not-found"){
       this.send("toggleAddressNotFoundPanel");
     }else{
       this.set("selectedFromList", true);
       this.set("edit_mode", false);
       this.set("selectedValue", item.get(valueProperty));
       this.set("selectedLocation", item);
       this.set(this.get("form_value"),  item );
     }
   },
   toggleAddressNotFoundPanel: function(){
     this.set("edit_mode", false);
     this.sendAction("addressNotFoundAction", this ); 
   }
  }
});
