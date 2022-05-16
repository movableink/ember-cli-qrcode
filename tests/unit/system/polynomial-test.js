import { test, module } from "qunit";
import Polynomial from "ember-cli-qrcode/system/polynomial";

module("polynomial");

test("instantiation", function (assert) {
  const polynomial = new Polynomial([1], 0);

  assert.strictEqual(polynomial.get(0), 1);
  assert.strictEqual(polynomial.getLength(), 1);
});

test("shifting", function (assert) {
  const polynomial = new Polynomial([1], 3);

  assert.deepEqual(
    polynomial.num,
    [1, undefined, undefined, undefined],
    "pads the number array with empty values"
  );
});

test("multiply", function (assert) {
  const polynomial = new Polynomial([1, 3], 0);

  const mult = polynomial.multiply(new Polynomial([1, 4], 0));
  assert.deepEqual(mult.num, [1, 7, 12], "multiplies the polynomials");
});

test("mod", function (assert) {
  const a = new Polynomial([1, 7, 12], 0);
  const b = new Polynomial([1, 3, 4], 0);

  assert.deepEqual(a.mod(b).num, [4, 8]);
});
