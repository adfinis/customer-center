
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('format-duration-short', 'helper:format-duration-short', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{format-duration-short inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

