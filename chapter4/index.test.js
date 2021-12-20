import { assert } from "chai";
import { Province, sampleProvinceData } from "./index.js";

describe("province", function () {
  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    assert.equal(asia.shortfall, 5);
  });
});
