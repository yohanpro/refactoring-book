// 사람과 사람이 속한 부서 정의

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }

  set manager(arg) {
    this._manager = arg;
  }
}

// 클라이언트가 어떤 사람이 속한 부서의 관리자를 알고 싶다고 하면, 부서 객체부터 일단 얻어와야 한다.

const manager = aPerson.department.manager;

// 이 방식은 클라이언트가 부서 클래스가 관리자 정보를 제공한다는 사실을 알아야 한다.
// 이 의존성을 줄이려면 클라이언트가 부서 클래스를 볼 수 없게 숨긴다음, 사람 클래스에 위임 클래스를 만든다.

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get department() {
    return this._department;
  }
  set department(arg) {
    this._department = arg;
  }
  get manager() {
    return this._department.manager;
  }
}

// 이제 접근하는 방법을 고친다.
const manager = aPerson.manager;

// Person 클래스에서 department를 삭제한다.
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set department(arg) {
    this._department = arg;
  }
  get manager() {
    return this._department.manager;
  }
}
