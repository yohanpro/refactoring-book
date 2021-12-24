import { assert, expect } from "chai";
import { Province, sampleProvinceData } from "./index.js";

describe("province", function () {
  let asia;
  this.beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it("shortfall", () => {
    expect(asia.shortfall).to.equal(5);
  });

  it("profit", () => {
    expect(asia.profit).to.equal(230);
  });

  it("change production", () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(280);
  });

  it("zero demand", () => {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  it("negative demand", () => {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-8);
  });

  it("빈 입력값을 받았을 경우", () => {
    asia.demand = "";
    expect(asia.shortfall).NaN;
    expect(asia.profit).NaN;
  });
});

// 경계 조건 검사하기
// 경계 조건이라 함은 예외상황 같은 경우.
describe("no producres", () => {
  let noProducers;
  beforeEach(() => {
    const data = {
      name: "No producers",
      producers: [],
      demand: 30,
      price: 20,
    };

    noProducers = new Province(data);
  });

  it("shortfall", () => {
    expect(noProducers.shortfall).to.equal(30);
  });

  it("profit", () => {
    expect(noProducers.profit).equal(0);
  });
});
