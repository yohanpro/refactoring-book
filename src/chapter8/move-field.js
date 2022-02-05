class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }
  get discountRate() {
    return this._discountRate;
  }
  becomePreferred() {
    this._discountRate += 0.03;
    // 기타 다른 작업들
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}

// 할인율을 뜻하는 discountRate를 CustomerContract필드로 옮기고 싶다.

// 일단 이 필드를 캡슐화한다.

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._setDiscountRate(discountRate);
    this._contract = new CustomerContract(dateToday());
  }
  get discountRate() {
    return this._discountRate;
  }
  _setDiscountRate(aNumber) {
    return (this._discountRate = aNumber);
  }
  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
  }
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this.discountRate));
  }
}

// CustomerContract 클래스에 필드와 접근자를 추가한ㄷ.
class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }

  get discountRate() {
    return this._discountRate;
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
}

// Cutomer의 접근자들이 새로운 필드를 사용하도록 수정한다.
// 하지만 생성자에서 contract 객체를 생성하기도 전에 _setDiscountRate를 호출하기 때문에 기존 상태로 돌린다음, 문장 슬라이드하기를 적용해 _setDiscountRate 호출을 생성 뒤로 옮겨야 한다.

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }
  get discountRate() {
    return this._contract.discountRate;
  }
  _setDiscountRate(aNumber) {
    return (this._contract.discountRate = aNumber);
  }
}
