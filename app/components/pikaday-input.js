import Ember from 'ember';
import WpfGenericField from 'welcome-pickups-form/mixins/wpf-generic-field';
/* globals Pikaday, moment, $ */

export default Ember.Component.extend(WpfGenericField, {
  tagName: 'input',
  classNames: 'wpf-pikaday',
  attributeBindings: ['readonly', 'required', 'placeholder', 'name'],
  theme: 'wpf-default',
  //minDate: null,
  calendar_min_date_threshold_hours: 0,

  setupPikaday: function() {
    var that = this;
    var browser_time_zone = moment.tz.zone(jstz.determine().name());
    var city_time_zone = moment.tz.zone(this.get("city_time_zone"));
    var threshold_date = moment().add(this.get("calendar_min_date_threshold_hours"),  'hours');
    var offset_browser_to_city_time_zone = browser_time_zone.offset(moment())-city_time_zone.offset(moment());
    var minDate = moment().add(this.get("calendar_min_date_threshold_hours"),  'hours').
    add(offset_browser_to_city_time_zone, "minutes").toDate();
    //    minDate = this.get('minDate') ? moment(this.get('minDate')).add(this.get('calendar_min_date_threshold'), 'd').toDate() : moment().add(this.get('calendar_min_date_threshold'), 'd').toDate();

    var options = {
      field: this.$()[0],
      onSelect: function() {
        Ember.run(function() {
          this.userSelectedDate();
        }.bind(this));
      }.bind(this),
      onOpen: function() {
        Ember.run(function() {
          Ember.$('.pika-single').addClass(this.get('theme')); // Add plugin custom theme
        }.bind(this));
      }.bind(this),
      onClose: function() {
        Ember.run(function() {
          Ember.$('.pika-single').removeClass(that.get('theme')); // Remove plugin custom theme
          if (this.get('pikaday').getDate() === null) {
            this.set('value', null);
          }
        }.bind(this));
      }.bind(this),
      firstDay: 1,
      minDate: minDate,
      format: this.get('format') || 'DD/MM/YYYY',
      yearRange: that.determineYearRange()
    };

    if (this.get('i18n')) {
      options.i18n = this.get('i18n');
    }

    var pikaday = new Pikaday(options);

    this.set('pikaday', pikaday);
    this.get('pikaday').setDate(this.get('value'), true);
/*
    this.$().on("focus", function(e){

      $(e.target).closest(".wpf-col").addClass("wpf-form-focused");
    });
    this.$().on("focusout", function(e){
      $(e.target).closest(".wpf-col").removeClass("wpf-form-focused");
    });
    Ember.run.scheduleOnce('afterRender', this, 'afterRenderEvent');
*/
  }.on('didInsertElement'),

  teardownPikaday: function() {
    this.get('pikaday').destroy();
  }.on('willDestroyElement'),

  userSelectedDate: function() {
    var selectedDate = this.get('pikaday').getDate();

    if (this.get('useUTC')) {
      selectedDate = moment.utc([selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()]).toDate();
    }

    this.set('value', selectedDate);
  },

  setDate: function() {
    if(typeof(this.$()) !== "undefined"){
      if(this.$().parsley().isValid()){
        this.$().closest(".wpf-col").addClass("wpf-form-valid");
        this.$().closest(".wpf-col").removeClass("wpf-form-invalid");
      }else{
        this.$().closest(".wpf-col").addClass("wpf-form-invalid");
        this.$().closest(".wpf-col").removeClass("wpf-form-valid");
      }
    }
    // Make sure pikaday has been set by the didInsertElement observer
    if(typeof(this.get('pikaday') === "undefined")){
      return;
    }

    if(this.get('value')) {
      this.$().removeClass('parsley-error');
      Ember.$('.wpf-pikaday + .parsley-errors-list').empty();
    }
    this.get('pikaday').setDate(this.get('value'), true);
  }.observes('value'),
/*
  setMinDate: function() {
    if(this.get('minDate')) {

      this.get('pikaday').setMinDate(moment(this.get('minDate')).add(this.get('calendar_min_date_threshold'), 'd').toDate(), true);
      this.get('pikaday').setDate(moment(this.get('minDate')).add(this.get('calendar_min_date_threshold'), 'd').toDate(), true);
    }
  }.observes('minDate'),
*/
  determineYearRange: function() {
    var yearRange = this.get('yearRange');

    if (yearRange) {
      if (yearRange.indexOf(',') > -1) {
        var yearArray =  yearRange.split(',');

        if (yearArray[1] === 'currentYear') {
          yearArray[1] = new Date().getFullYear();
        }

        return yearArray;
      } else {
        return yearRange;
      }
    } else {
      return 10;
    }
  },
  /*
  afterRenderEvent : function() {
    var that = this;
    this.$("").parsley().subscribe("parsley:field:validated", function(e){
      if(e.isValid()){
        that.$().closest(".wpf-col").addClass("wpf-form-valid");
        that.$().closest(".wpf-col").removeClass("wpf-form-invalid");
      }else{
        that.$().closest(".wpf-col").addClass("wpf-form-invalid");
        that.$().closest(".wpf-col").removeClass("wpf-form-valid");
      }
    });
  }*/
});
