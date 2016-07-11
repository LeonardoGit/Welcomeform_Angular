import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('wpf-textarea-field', 'Integration | Component | wpf textarea field', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{wpf-textarea-field}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#wpf-textarea-field}}
      template block text
    {{/wpf-textarea-field}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
