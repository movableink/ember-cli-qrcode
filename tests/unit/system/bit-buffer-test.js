import { test, module } from "qunit";
import BitBuffer from "ember-cli-qrcode/system/bit-buffer";

module("bit-buffer");

test("instantiates an object", function (assert) {
  const buffer = new BitBuffer();

  buffer.put(0, 4);
  buffer.put(0xff, 8);
  buffer.put(0, 4);
  buffer.putBit(true);

  assert.strictEqual(buffer.getLengthInBits(), 17, "has correct length");
  assert.false(buffer.get(0));
  assert.true(buffer.get(4));
  assert.true(buffer.get(5));
  assert.false(buffer.get(14));
  assert.true(buffer.get(16));
});
