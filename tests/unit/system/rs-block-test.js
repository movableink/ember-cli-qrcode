import { test, module } from "ember-qunit";
import RSBlock from "@timeforinnovation/ember-cli-qrcode/system/rs-block";

module("rs-block");

test("getRSBlocks", (assert) => {
  const blocks = RSBlock.getRSBlocks(3, 2);

  assert.equal(blocks.length, 2, "returns 2 blocks");
  assert.equal(blocks[0].dataCount, 13);
  assert.equal(blocks[0].totalCount, 35);
  assert.equal(blocks[0].dataCount, 13);
});

test("getRSBlocks with bad typeNumber", (assert) => {
  assert.throws(
    function () {
      RSBlock.getRSBlocks(1000, 2);
    },
    /bad rs block/,
    "throws bad rs block error"
  );
});

test("getRsBlockTable", (assert) => {
  const table = RSBlock.getRsBlockTable(3, 2);
  assert.deepEqual(table, [2, 35, 13], "returns the table");
});
