class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    const basePrice = this.quantity * this._item.price;
    let discountFactor = 0.98;

    if (basePrice > 1000) {
      discountFactor -= 0.03;
    }
    return basePrice * discountFactor;
  }
}

// 임시 변수인 basePrice, discountFactor를 질의함수로 바꾼다.

// 대입문의 우변을 게터로 추출한다.

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    const basePrice = this.basePrice;
    let discountFactor = 0.98;

    if (basePrice > 1000) {
      discountFactor -= 0.03;
    }
    return basePrice * discountFactor;
  }

  get basePrice() {
    return this.quantity * this._item.price;
  }
}

// 테스트 후 변수를 인라인한다.

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    let discountFactor = 0.98;

    if (this.basePrice > 1000) {
      discountFactor -= 0.03;
    }
    return this.basePrice * discountFactor;
  }

  get basePrice() {
    return this.quantity * this._item.price;
  }
}

//discountFactor도 처리한다.

class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    const discountFactor = this.discountFactor;
    return this.basePrice * discountFactor;
  }

  get basePrice() {
    return this.quantity * this._item.price;
  }

  get discountFactor() {
    let discountFactor = 0.98;
    if (this.basePrice > 1000) {
      discountFactor -= 0.03;
    }

    return discountFactor;
  }
}

// 변수를 인라인한다.
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }

  get price() {
    return this.basePrice * this.discountFactor;
  }

  get basePrice() {
    return this.quantity * this._item.price;
  }

  get discountFactor() {
    let discountFactor = 0.98;
    if (this.basePrice > 1000) {
      discountFactor -= 0.03;
    }

    return discountFactor;
  }
}
