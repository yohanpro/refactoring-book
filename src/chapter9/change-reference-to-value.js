const { assert } = require("console");

// before
class Product {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
// after

class Product {
  applyDiscount(arg) {
    this._price = new Money(this._price.amount - arg, this._price.currency);
  }
}

// 사람 객체, 이 객체는 코드 생성시점에서 전화번호가 올바로 설정되지 못하게 짜여있다.

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }

  set areaCode(arg) {
    this._areaCode = arg;
  }

  get number() {
    return this._number;
  }

  set number(arg) {
    this._number = arg;
  }
}

// 추출해서 새로 만들어진 객체들을 갱신하는 메서드들은 여전히 추출 전 클래스에 존재한다.(Person에 위치)

//1단계. 전화번호를 불변으로 바꾼다.
class TelephoneNumber {
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
}

// 세터를 호출하는 쪽을 바꿔서 전화번호를 매번 다시 대입하도록 바꾼다.
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }

  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(
      arg,
      this._telephoneNumber.number
    );
  }

  get officeNumber() {
    return this._telephoneNumber.number;
  }

  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

//전화번호는 불변이 되었고 값으로 바꿀 준비가 되었다. 동치성 검사를 수행한다.

class TelephoneNumber {
  equals(other) {
    if (!(other instanceof TelephoneNumber)) {
      return false;
    }

    return this.areaCode === other.areaCode && this.number === other.number;
  }
}

// 테스트도 해준다.

it("telephone equals", function () {
  assert(
    new TelephoneNumber("312", "555-0142").equals(
      new TelephoneNumber("312", "555-0142")
    )
  );
});
