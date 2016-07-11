import Ember from 'ember';

export default Ember.Mixin.create({
  onFocus: function(){
    this.$().on("focus", function(e){
      $(e.target).closest(".wpf-col").addClass("wpf-form-focused");
    });
    this.$().on("focusout", function(e){
      $(e.target).closest(".wpf-col").removeClass("wpf-form-focused");
    });
  }.on("didInsertElement"),
  setValid: function(){
    var that = this;
    this.$().parsley().on("field:validated", function(e){
      that.set("valid", e.isValid());
    });
  }.on("didInsertElement"),
  onValidChange: function(){
    this.get("valid") ?
      this.$().closest(".wpf-col").addClass("wpf-form-valid").removeClass("wpf-form-invalid") : 
      this.$().closest(".wpf-col").addClass("wpf-form-invalid").removeClass("wpf-form-valid");
  }.observes("valid")
});
