import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('reverse-locations', 'Integration | Component | reverse locations', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reverse-locations}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#reverse-locations}}
      template block text
    {{/reverse-locations}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
