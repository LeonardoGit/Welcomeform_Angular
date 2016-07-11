import Ember from "ember";
/* global ga */

export default Ember.Mixin.create({
  // Namespace ga tracker
  trackerName: 'wpf_tracker',

  pageHasGa: function() {
    return window.ga && typeof window.ga === "function";
  },

  trackPageView: function(page) {
    if (this.pageHasGa()) {
      ga(function() {
        var trackers = ga.getAll();
        var _tracker = trackers.find(function (tracker) {
          return tracker.get('name') === this.trackerName;
        }.bind(this));

        if(!_tracker) {
          ga('create', 'UA-30508575-4', 'auto', {'name': this.trackerName});
        }
      }.bind(this));

      if (!page) {
        var loc = window.location;
        page = loc.hash ? loc.hash.substring(1) : loc.pathname + loc.search;
      }

      ga(this.trackerName+'.send', 'pageview', page);
    } else {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-30508575-4', 'auto', {'name': this.trackerName});
      this.trackPageView(page);
    }
  },

  /*
    Send custom ga events

    - Category (required): The category is at the top of the hierarchy. It’s a way to bundle user activity together. "Slideshow", "Videos", and "Downloads" are good examples of categories, though you can be as specific or broad as your content requires.

    - Action (required): The action is literally what the user does. For a video player example, potential actions might be: play, pause, share, get embed link, etc.

    - Label (optional): Provides a bit more information about the user's action. For example, if you are using events to track a video player you might record the movie name as the label when an action occurs. That provides more context to what the user is doing.

    - Value (optional): Any positive integer value. It’s a number. You can use it to count things, like dollars or seconds. If you choose to use your event as a goal, then you can specify that Google Analytics use the event value as the goal value.
  */
  trackEvent: function(category, action, label, value) {
    if (this.pageHasGa()) {
      ga(this.trackerName+'.send', 'event', category, action, label, value);
    }
  }
});