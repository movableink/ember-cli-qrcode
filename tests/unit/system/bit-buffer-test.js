import { test, module } from "ember-qunit";
import BitBuffer from "@timeforinnovation/ember-cli-qrcode/system/bit-buffer";

module("bit-buffer");

test("instantiates an object", (assert) => {
  const buffer = new BitBuffer();

  buffer.put(0, 4);
  buffer.put(0xff, 8);
  buffer.put(0, 4);
  buffer.putBit(true);

  assert.equal(buffer.getLengthInBits(), 17, "has correct length");
  assert.equal(buffer.get(0), false);
  assert.equal(buffer.get(4), true);
  assert.equal(buffer.get(5), true);
  assert.equal(buffer.get(14), false);
  assert.equal(buffer.get(16), true);
});
