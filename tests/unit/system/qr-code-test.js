import { test, module } from "qunit";
import qrCode from "ember-cli-qrcode/system/qr-code";

module("qr-code");

test("generates a new CodeModel", function (assert) {
  const code = qrCode("http://example.com");

  assert.strictEqual(
    code.getModuleCount(),
    25,
    "has correct number of modules"
  );
});

test("accepts error correction parameter", function (assert) {
  const code = qrCode("http://example.com", "H");

  assert.strictEqual(
    code.getModuleCount(),
    29,
    "has correct number of modules"
  );
});

test("fails on text that is too long", function (assert) {
  const code = qrCode("a".repeat(2940));
  assert.strictEqual(code.getModuleCount(), 177);

  assert.throws(
    () => {
      qrCode("a".repeat(2951), "L");
    },
    /Data exceeded max length/,
    "is too long"
  );
});
