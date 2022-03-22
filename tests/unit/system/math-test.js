import { test, module } from "ember-qunit";
import { glog, gexp } from "@timeforinnovation/ember-cli-qrcode/system/math";

module("math");

test("glog", (assert) => {
  assert.equal(glog(1), 0);
  assert.equal(glog(2), 1);
  assert.equal(glog(5), 50);
  assert.equal(glog(20), 52);
  assert.equal(glog(254), 88);

  assert.throws(
    function () {
      assert.equal(glog(-1), 0);
    },
    /glog/,
    "must be greater than 1"
  );
});

test("gexp", (assert) => {
  assert.equal(gexp(0), 1);
  assert.equal(gexp(1), 2);
  assert.equal(gexp(50), 5);
  assert.equal(gexp(52), 20);
  assert.equal(gexp(254), 142);
});
