class Book {
  constructor() {
    this._reservations = [];
  }
  addReservation(customer) {
    this._reservations.push(customer);
  }
}

// 1단계 새로운 함수로 추출하기
