class Person {
  get name() {
    return this._name;
  }
  set name(arg) {
    this.name = arg;
  }

  get telephoneNumber() {
    return `(${this.officeAreaCode} ${this.officeNumber}})`;
  }
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
  get officeNumber() {
    return this._officeNumber;
  }
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}

// 전화번호 관련 동작을 별도 클래스로 뽑는다. 먼저 빈 전화번호를 표현하는 Telephone Class를 정의한다.

class TelephoneNumber {}

// 그 다음 Person클래스의 인스턴스를 생성할때 전화번호 인스턴스도 함께 생성해준다.

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
}

class TelephoneNumber {
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
}

// 필드들을 하나씩 새 클래스로 옮긴다.

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get telephoneNumber() {
    return `(${this.officeAreaCode} ${this.officeNumber}})`;
  }

  get officeAreaCode() {
    return this._telephoneNumber.officeAreaCode;
  }
  set officeAreaCode(arg) {
    this.this._telephoneNumber.officeAreaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.officeNumber;
  }
  set officeNumber(arg) {
    this._telephoneNumber.officeNumber = arg;
  }
}

// 필드들을 옮기고 마지막으로 telephoneNumber 메소드도 옮긴다.
class TelephoneNumber {
  get telephoneNumber() {
    return `(${this.officeAreaCode} ${this.officeNumber}})`;
  }
  get officeAreaCode() {
    return this._officeAreaCode;
  }

  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
}
class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get telephoneNumber() {
    return this._telephoneNumber.telephoneNumber;
  }

  get officeAreaCode() {
    return this._telephoneNumber.officeAreaCode;
  }
  set officeAreaCode(arg) {
    this.this._telephoneNumber.officeAreaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.officeNumber;
  }
  set officeNumber(arg) {
    this._telephoneNumber.officeNumber = arg;
  }
}

// 새로만든 클래스는 순순한 전화번호를 뜻하므로 사무실이란 (office)라는 단어를 사용할 필요가 없다.  그러니 이름들을 적절히 바꾸어준다.

class TelephoneNumber {
  get telephoneNumber() {
    return `(${this._areaCode} ${this.number}})`;
  }
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    return (this._areaCode = arg);
  }

  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
}

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
  get telephoneNumber() {
    return this._telephoneNumber.telephoneNumber;
  }

  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  set officeAreaCode(arg) {
    this.this._telephoneNumber.areaCode = arg;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
}

// 마지막으로 전화번호를 사람이 읽기 좋은 포맷으로 출력하는 역할도 전화번호 클래스에 맡긴다.

class TelephoneNumber {
  get telephoneNumber() {
    return `(${this.officeAreaCode} ${this.officeNumber}})`;
  }
  get areaCode() {
    return this._areaCode;
  }
  set areaCode(arg) {
    return (this._areaCode = arg);
  }

  get number() {
    return this._number;
  }
  set number(arg) {
    this._number = arg;
  }
  toString() {
    return `(${this.officeAreaCode} ${this.officeNumber}})`;
  }
}

class Person {
  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
}
