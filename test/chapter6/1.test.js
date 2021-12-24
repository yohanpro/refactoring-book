import { assert, expect } from "chai";
import {
  reportLines,
  gatherCustomerData,
} from "../../src/chapter6/inline-function/1.js";

describe("함수 인라인하기", () => {
  it("report Line 인라인하기", () => {
    const customer = {
      name: "홍길동",
      location: "서울",
    };

    const lines = reportLines(customer);

    expect(lines).to.have.lengthOf(2);
    expect(lines[1]).to.have.includes("location");
  });
});
