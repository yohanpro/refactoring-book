
### 테스트 시 주의사항

```js

 const asia = new Province(sampleProvinceData()); //bad

  it("shortfall", () => {
    const asia = new Province(sampleProvinceData());
    expect(asia.shortfall).to.equal(5);
  });

  it("profit", () => {
    expect(asia.profit).to.equal(230);
  });
```

- 동일한 로직이 있다고 해서 '테스트끼리 상호작용하게 만들면 안된다.


좋은 방법 
```js
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
});

```

- 테스트에는 설정, 실행 검증 단계가 있다. 코드만 보면 어떤 말을 하는지 대충 짐작은 간다.
