import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('wpf-tooltip', 'Integration | Component | wpf tooltip', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{wpf-tooltip}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#wpf-tooltip}}
      template block text
    {{/wpf-tooltip}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
