// 주문 클래스

class 주문 {
  constructor(data) {
    this._number = data.number;
    this._customer = new Customer(data.customer); // <- data.customer가 고객 ID
  }

  get customer() {
    return this._customer;
  }
}

class 고객 {
  constructor(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}

// 고객 ID가 123인 주문을 여러개 만든다면 독립된 고객 객체가 다섯개 만들어진다.
// 하나를 수정한다고 해서 다른 곳에 영향을 미치진 않는다.

// 고객 서비스에서 얻어온 데이터를 고객 객체에 넣어야 한다면 모두 갈아서 넣어야 한다.

// 저장소 객체를 사용해보자.

let respositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customers = new Map();
}

export function registerCustomer(id) {
  if (!_repositoryData.customers.has(id)) {
    _repositoryData.customers.set(id, new 고객(id));
  }
  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customers.get(id);
}

// 고객 객체를 ID와 함께 등록할 수 있고

class 주문 {
  constructor(data) {
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
  }

  get customer() {
    return this._customer;
  }
}
