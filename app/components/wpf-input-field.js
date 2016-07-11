import Ember from 'ember';
import WpfGenericField from 'welcome-pickups-form/mixins/wpf-generic-field';

export default Ember.TextField.extend(WpfGenericField, {

/*
  attributeBindings: ['data-parsley-pattern', 'data-parsley-pattern-message'],

  becomeFocused: function() {
    this.$().on("focus", function(e){
      $(e.target).closest(".wpf-col").addClass("wpf-form-focused");
    });
    this.$().on("focusout", function(e){
      $(e.target).closest(".wpf-col").removeClass("wpf-form-focused");
    });
    this.$().on("change", function(e){
      if($(e.target).parsley().isValid()){
        $(e.target).closest(".wpf-col").addClass("wpf-form-valid");
        $(e.target).closest(".wpf-col").removeClass("wpf-form-invalid");
      }else{
        $(e.target).closest(".wpf-col").addClass("wpf-form-invalid");
        $(e.target).closest(".wpf-col").removeClass("wpf-form-valid");
      }
    });
    if(this.$().parsley().isValid()){
      this.$().closest(".wpf-col").addClass("wpf-form-valid");
      this.$().closest(".wpf-col").removeClass("wpf-form-invalid");
    }

    Ember.run.scheduleOnce('afterRender', this, 'afterRenderEvent');
  }.on('didInsertElement'),
  afterRenderEvent : function() {
    var that = this;
    if(typeof(this.$()) === "undefined"){
      return ;
    }
    this.$().parsley().subscribe("parsley:field:validated", function(e){
      if(typeof(that.$()) === "undefined"){
        return ;
      }
      if(e.isValid()){
        that.$().closest(".wpf-col").addClass("wpf-form-valid");
        that.$().closest(".wpf-col").removeClass("wpf-form-invalid");
      }else{
        that.$().closest(".wpf-col").addClass("wpf-form-invalid");
        that.$().closest(".wpf-col").removeClass("wpf-form-valid");
      }
    });
  }
  */
});
