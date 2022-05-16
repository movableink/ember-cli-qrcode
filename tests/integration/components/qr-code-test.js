import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

import samples from "../../data/samples";

module("Integration | Component | qr-code", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`<QrCode @text="http://foo.com"/>`);

    const svg = this.element.querySelector("svg");
    assert.ok(svg, "appends svg element");
    assert.strictEqual(svg.getAttribute("width"), "100%", "sets default width");

    const tiles = svg.querySelectorAll("use");
    assert.strictEqual(
      tiles.length,
      230,
      "includes the correct number of tiles"
    );
  });

  test("colors and sizes", async function (assert) {
    await render(
      hbs`<QrCode @text="http://foo.com" @darkColor='green' @lightColor='pink' @size=300/>`
    );

    const svg = this.element.querySelector("svg");
    assert.ok(svg, "appends svg element");

    assert.strictEqual(svg.getAttribute("width"), "300", "sets width");
    assert.strictEqual(svg.getAttribute("height"), "300", "sets height");

    const bg = svg.querySelector("rect");
    assert.strictEqual(
      bg.getAttribute("fill"),
      "pink",
      "sets the background color"
    );

    const tile = svg.querySelector('rect[width="1"]');
    assert.strictEqual(
      tile.getAttribute("fill"),
      "green",
      "sets the dark color"
    );
  });

  test("samples", async function (assert) {
    assert.expect(samples.length);

    for (let [url, expectedTiles] of samples) {
      this.set("url", url);
      await render(hbs`<QrCode @text={{this.url}}/>`);

      const elements = [...this.element.querySelectorAll("svg use")];
      const tiles = elements.map((e) => [
        parseInt(e.getAttribute("y")),
        parseInt(e.getAttribute("x")),
      ]);
      assert.deepEqual(expectedTiles, tiles, "contains the correct tiles");
    }
  });
});
