import { test, module } from "qunit";
import RSBlock from "ember-cli-qrcode/system/rs-block";

module("rs-block");

test("getRSBlocks", function (assert) {
  const blocks = RSBlock.getRSBlocks(3, 2);

  assert.strictEqual(blocks.length, 2, "returns 2 blocks");
  assert.strictEqual(blocks[0].dataCount, 13);
  assert.strictEqual(blocks[0].totalCount, 35);
  assert.strictEqual(blocks[0].dataCount, 13);
});

test("getRSBlocks with bad typeNumber", function (assert) {
  assert.throws(
    function () {
      RSBlock.getRSBlocks(1000, 2);
    },
    /bad rs block/,
    "throws bad rs block error"
  );
});

test("getRsBlockTable", function (assert) {
  const table = RSBlock.getRsBlockTable(3, 2);
  assert.deepEqual(table, [2, 35, 13], "returns the table");
});
