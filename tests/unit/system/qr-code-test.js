import { test, module } from "ember-qunit";
import qrCode from "@timeforinnovation/ember-cli-qrcode/system/qr-code";

module("qr-code");

test("generates a new CodeModel", (assert) => {
  const code = qrCode("http://example.com");

  assert.equal(code.getModuleCount(), 25, "has correct number of modules");
});

test("accepts error correction parameter", (assert) => {
  const code = qrCode("http://example.com", "H");

  assert.equal(code.getModuleCount(), 29, "has correct number of modules");
});

test("fails on text that is too long", (assert) => {
  const code = qrCode("a".repeat(2940));
  assert.equal(code.getModuleCount(), 177);

  assert.throws(
    () => {
      qrCode("a".repeat(2951), "L");
    },
    /Data exceeded max length/,
    "is too long"
  );
});
