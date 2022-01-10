const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = orderData[1] * productPrice;

//위에서 아래로 바뀌었다.
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return {
    productID: values[0].split("-")[1],
    quantity: values[1],
  };
}

function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}

////////////////////////////////////////////////////////////////////

// 상품의 결제금액을 계산하는 코드
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const shippengPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippengPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}

// 앞의 몇 줄은 상품정보를 이용해서 상품가격을 계산한다.
// 뒤의 코드는 배송정보를 이용해서 배송비를 계산한다.

// 나중에 상품가격과 배송비 계산을 더 복잡하게 만드는 변경이 생긴다면, 두 단계로 처리하자.

// 1. 배송비 계산 부분을 함수로 추출한다.
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const price = applyShipping(basePrice, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippengPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippengPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}

// 인자가 너무 많아졌다. 하지만 걸러낼것이기 때문에 괜찮다.

// 2. 첫번째 단계와 두번째 단계가 주고받을 중간 데이터 구조를 만든다.
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const priceData = {};
  const price = applyShipping(
    priceData,
    basePrice,
    shippingMethod,
    quantity,
    discount
  );
  return price;
}

function applyShipping(
  priceData,
  basePrice,
  shippingMethod,
  quantity,
  discount
) {
  const shippengPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippengPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}

// 일단 만들기만 했다. 이제 applyShipping에 전달되는 매개변수들을 살펴본다.
// basePrice는 첫 번째 단계를 수행하는 코드에서 생성된다. 중간데이터로 옮기고 매개변수에서 제거한다.
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const priceData = { basePrice };
  const price = applyShipping(priceData, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(priceData, shippingMethod, quantity, discount) {
  const shippengPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = quantity * shippengPerCase;
  const price = priceData.basePrice - discount + shippingCost;
  return price;
}

// shippingMethod를 보면, 첫번째 단계에서는 사용하지 않으니 그대로 둔다. quantity는 첫번째 단계에서 사용하긴 하는데, 여기에서 생성된것은 아니다.
// 따라서 quantity는 그대로 둬도 된다.하지만, 최대한 중간데이터에 넣는게 좋기 때문에 이것도 일단 옮겨주자.

function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const priceData = { basePrice, quantity };
  const price = applyShipping(priceData, shippingMethod, discount);
  return price;
}

function applyShipping(priceData, shippingMethod, discount) {
  const shippengPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippengPerCase;
  const price = priceData.basePrice - discount + shippingCost;
  return price;
}

// discount도 처리하자.

function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  const priceData = { basePrice, quantity, discount };
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function applyShipping(priceData, shippingMethod) {
  const shippengPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippengPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}

// 매개변수들을 다 처리하고 나면, 중간데이터 구조가 완성된다. 첫번째 단계코드를 함수로 추출하고 이 데이터 구조를 반환하게 하자.
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  return { basePrice, quantity, discount };
}
function applyShipping(priceData, shippingMethod) {
  const shippengPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippengPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}

// 최종 결과를 담은 상수들(price)도 깔끔하게 정리하자

function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;

  return { basePrice, quantity, discount };
}
function applyShipping(priceData, shippingMethod) {
  const shippengPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountFee
      : shippingMethod.feePerCase;

  const shippingCost = priceData.quantity * shippengPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}
