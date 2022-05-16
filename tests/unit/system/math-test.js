import { test, module } from "qunit";
import { glog, gexp } from "ember-cli-qrcode/system/math";

module("math");

test("glog", function (assert) {
  assert.expect(6);

  assert.strictEqual(glog(1), 0);
  assert.strictEqual(glog(2), 1);
  assert.strictEqual(glog(5), 50);
  assert.strictEqual(glog(20), 52);
  assert.strictEqual(glog(254), 88);

  assert.throws(
    function () {
      assert.strictEqual(glog(-1), 0);
    },
    /glog/,
    "must be greater than 1"
  );
});

test("gexp", function (assert) {
  assert.strictEqual(gexp(0), 1);
  assert.strictEqual(gexp(1), 2);
  assert.strictEqual(gexp(50), 5);
  assert.strictEqual(gexp(52), 20);
  assert.strictEqual(gexp(254), 142);
});
