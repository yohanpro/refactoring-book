class Book {
  constructor() {
    this._reservations = [];
  }
  addReservation(customer) {
    this._reservations.push(customer);
  }
}

// 1단계 새로운 함수로 추출하기
class Book {
  constructor() {
    this._reservations = [];
  }
  addReservation(customer) {
    this._reservations.push(customer);
  }
  // 함수를 복사해서 두기
  zz_addReservation(customer) {
    this._reservations.push(customer);
  }
}
