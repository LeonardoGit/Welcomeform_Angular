import Ember from 'ember';
import WpfInputField from 'welcome-pickups-form/components/wpf-input-field'

export default WpfInputField.extend({
  tagName: 'input',
  attributeBindings: ['type'],
  type: 'tel',

  allowExtensions: true,
  autoFormat: true,
  autoHideDialCode: true,
  autoPlaceholder: true,
  defaultCountry: "",
  geoIpLookup: null,
  nationalMode: true,

  /**
   * Gets the type of the current `number`. Setting `numberType` when `value`
   * is empty and no custom placeholder is set will affect the format of the
   * auto placeholder. Requires the utilities script.
   *
   * Supported values:
   * - "FIXED_LINE"
   * - "MOBILE"
   * - "FIXED_LINE_OR_MOBILE"
   * - "TOLL_FREE"
   * - "PREMIUM_RATE"
   * - "SHARED_COST"
   * - "VOIP"
   * - "PERSONAL_NUMBER"
   * - "PAGER"
   * - "UAN"
   * - "VOICEMAIL"
   * - "UNKNOWN"
   */
  numberType: Ember.computed('number', {
    get: function() {
      if (this.get('hasUtilsScript')) {

        var typeNumber = this.$().intlTelInput('getNumberType');
        for(let key in intlTelInputUtils.numberType) {
          if (intlTelInputUtils.numberType[key] === typeNumber) {
            return key;
          }
        }

      }

      return 'MOBILE';
    },
    set: function(key, newValue) {
      if (this.get('hasUtilsScript') && newValue in intlTelInputUtils.numberType) {
        return newValue;
      }

      return 'MOBILE';
    }
  }),


  preferredCountries: ['us', 'gb'],
  _numberFormat: 'INTERNATIONAL',
  numberFormat: Ember.computed('value', {
    get: function() {
      return this.get('_numberFormat');
    },
    set: function(key, newValue) {
      if (this.get('hasUtilsScript') && newValue in intlTelInputUtils.numberFormat) {
        this.set('_numberFormat', newValue);
      }

      return this.get('_numberFormat');
    }
  }),

  number: Ember.computed('value', 'numberFormat', {
    get: function() {
      if (this.get('hasUtilsScript')) {
        var numberFormat = intlTelInputUtils.numberFormat[this.get('numberFormat')];
        return this.$().intlTelInput('getNumber', numberFormat);
      }
    },
    set: function() { /* no-op */ }
  }),

  extension: Ember.computed('number', {
    get: function() {
      return this.$().intlTelInput('getExtension');
    },
    set: function() { /* no-op */ }
  }),

  selectedCountryData: Ember.computed('value', {
    get: function() {
      return this.$().intlTelInput('getSelectedCountryData');
    },
    set: function() { /* no-op */ }
  }),

  isValidNumber: Ember.computed('number', {
    get: function() {
      return this.$().intlTelInput('isValidNumber');
    },
    set: function() { /* no-op */ }
  }),

  validationError: Ember.computed('number', {
    get: function() {
      if (this.get('hasUtilsScript')) {
        var errorNumber = this.$().intlTelInput('getValidationError');
        for(let key in intlTelInputUtils.validationError) {
          if (intlTelInputUtils.validationError[key] === errorNumber) {
            return key;
          }
        }
      }
    },
    set: function() { /* no-op */ }
  }),

  hasUtilsScript: Ember.computed({
    get: function() {
      return (typeof intlTelInputUtils !== 'undefined');
    },
    set: function() { /* no-op */ }
  }),

  setupIntlTelInput: Ember.on('didInsertElement', function() {
    var notifyPropertyChange = this.notifyPropertyChange.bind(this, 'value');

    // let Ember be aware of the changes
    this.$().change(notifyPropertyChange);

    this.$().intlTelInput({
      allowExtensions: this.get('allowExtensions'),
      autoFormat: this.get('autoFormat'),
      autoHideDialCode: this.get('autoHideDialCode'),
      autoPlaceholder: this.get('autoPlaceholder'),
      defaultCountry: this.get('defaultCountry'),
      geoIpLookup: this.get('geoIpLookup'),
      nationalMode: this.get('nationalMode'),
      numberType: this.get('numberType'),
      onlyCountries: this.get('onlyCountries'),
      preferredCountries: this.get('preferredCountries'),
    })
    .then(function() {
      // trigger a change after the plugin is initialized to set initial values
      notifyPropertyChange();
    });
  }),

  teardownIntlTelInput: Ember.on('willDestroyElement', function() {
    this.$().intlTelInput('destroy');
  })

});
