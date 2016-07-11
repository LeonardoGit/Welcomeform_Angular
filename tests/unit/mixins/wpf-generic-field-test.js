import Ember from 'ember';
import WpfGenericFieldMixin from '../../../mixins/wpf-generic-field';
import { module, test } from 'qunit';

module('Unit | Mixin | wpf generic field');

// Replace this with your real tests.
test('it works', function(assert) {
  var WpfGenericFieldObject = Ember.Object.extend(WpfGenericFieldMixin);
  var subject = WpfGenericFieldObject.create();
  assert.ok(subject);
});
