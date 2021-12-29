let defaultOwner = { firstName: "Yohan", lastName: "Kim" };

let defaultOwnerData = { firstName: "Yohan", lastName: "Kim" };

export function defaultOwner() {
  return defaultOwnerData;
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

// 데이터는 함수처럼 만들기가 쉽지 않기 때문에, 데이터의 접근을 독점하는 캡슐화하는 것이 가장 좋은 방법일 때가 많다.

let defaultOwner = { firstName: "Yohan", lastName: "Kim" };

// 기본적인 캡슐화를 위해 읽고 쓰는 함수를 정의한다.
// 값 캡슐화하기

const owner1 = defaultOwner();

// 게터가 데이터의 복제본을 반환하도록 수정하는 식으로 처리한다.

let defaultOwnerData = { firstName: "Yohan", lastName: "Kim" };
export function defaultOwner() {
  return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

let defaultOwnerData = { firstName: "Yohan", lastName: "Kim" };
export function defaultOwner() {
  return new Person(defaultOwnerData);
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

class Person {
  constructor(data) {
    this._lastName = data.lastName;
    this._firstName = data.firstName;
  }

  get lastName() {
    return this._lastName;
  }
  get firstName() {
    return this._firstName;
  }
}
