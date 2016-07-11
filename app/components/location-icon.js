import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  tagName: "span",
  icon_type: function(){
    var type;
    switch(this.get("location.type")){
      case "Airport":
        type = "airplane";
        break;
      case "Port":
        type = "boat";
        break;
      case "Airbnb":
        type = "airbnb";
        break;
      case "Hotel":
        type= "hotel";
        break;
      default:
        type = "pin";
    };

    return type;
  }.property("location.type"),

  icon_name: function(){
    return config.pathPrefix+"images/icon_"+this.get("icon_type")+"@2x.png";
  }.property("icon_type"),

  icon_name_active: function(){
    return config.pathPrefix+"images/icon_"+this.get("icon_type")+"_active@2x.png";
  }.property("icon_type"),
});
