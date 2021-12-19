import { assert } from "chai";

describe("province", function () {
  it("should return province", function () {
    assert.equal(province("123456789"), "Ontario");
  });
});
