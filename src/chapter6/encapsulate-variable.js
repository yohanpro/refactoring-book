let defaultOwner = { firstName: "Yohan", lastName: "Kim" };

let defaultOwnerData = { firstName: "Yohan", lastName: "Kim" };

export function defaultOwner() {
  return defaultOwnerData;
}
export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

// 데이터는 함수처럼 만들기가 쉽지 않기 때문에, 데이터의 접근을 독점하는 캡슐화하는 것이 가장 좋은 방법일 때가 많다.
