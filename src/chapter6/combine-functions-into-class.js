reading = { customer: "john", quantity: 10, month: 5, year: 2022 };

// 기본 요금 계산하기

const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

// 기본 차 소비량은 면세해주기

const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.customer));

//기본 요금 계산공식이 똑같이 등장하므로 추출하는게 좋아보인다.

const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

////////////////////////////////////////////////////////////////////////////////

// 데이터를 캡슐화해버리자.

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }
  get quantity() {
    return this._quantity;
  }
  get month() {
    return this._month;
  }
  get year() {
    return this._year;
  }
}

// calculateBaseCharge 함수를 옮겨보자.
// 1. 데이터를 얻자마자 객체로 만들자.
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

// 2. calcluateBaseCharge를 새로 만든 클래스에 옮기자.

class Reading {
  //...
  get calculateBaseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = aReading.calculateBaseCharge(aReading);

// 3. 메소드 이름도 바꾸어 주자.
class Reading {
  //...
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}

// 이렇게 되면 Reading 클래스의 baseCharge는 함수인지 필드인지 알 수 없는데 . 단일 접근원칙에 따라 권장하는 방식이다.

// 세금 계산하는 클라이언트 코드 인라인해주기

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = Math.max(
  0,
  aReading.baseCharge - taxThreshold(aReading.year)
);

// 우선 세금 부과하는 함수를 추출

function taxableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}

// 그리고 이걸 Reading 클래스에 옮긴다.
class Reading {
  //...
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

// 이제 이렇게 바뀐다.
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
