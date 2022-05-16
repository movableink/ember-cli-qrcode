import { test, module } from "qunit";
import EightBitByte from "ember-cli-qrcode/system/8bit-byte";

module("8bit-byte");

test("instantiates an object", function (assert) {
  const parser = new EightBitByte("http://example.com");

  assert.ok(parser instanceof EightBitByte, "instantiates an EightBitByte");
});

test("returns correct length for ascii", function (assert) {
  const parser = new EightBitByte("http://example.com");

  assert.strictEqual(parser.getLength(), 18, "correct length");
});

test("returns correct length for utf-8", function (assert) {
  const parser = new EightBitByte("http://éxample.cøm");

  assert.strictEqual(parser.getLength(), 23, "utf-8 characters are encoded");
});

test("writes a buffer with parsed data", function (assert) {
  const parser = new EightBitByte("http://éxample.cøm");

  const buffer = {
    data: "",
    put(str) {
      this.data += str;
    },
  };

  parser.write(buffer);
  assert.strictEqual(
    buffer.data,
    "239187191104116116112584747195169120971091121081014699195184109",
    "writes encoded data"
  );
});
