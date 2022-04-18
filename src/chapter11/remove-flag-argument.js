function bookConcert(aCustomer, isPremium) {
  if (isPremium) {
    // 로직
  } else {
    // 일반 로직
  }
}

// 콘서트를 프리미엄으로 예약하려면

bookConcert(aCustomer, true);
// 열거형일수도
bookConcert(aCustomer, CustomerType.PREMIUM);
// 또 다른 타입을 사용하기도 함
bookConcert(aCustomer, "premium");

// 배송일자를 계산하는 호출
aShipment.deliveryDate = deliveryDate(anOrder, true);
// 혹은 아래와 같음
aShipment.deliveryDate = deliveryDate(anOrder, false);

//도대체 불리언 값은 무엇을 의미한단 말인가

function deliveryDate(anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
    if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
    else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else deliveryTime = 3;
    return anOrder.placeOn.plusDays(1 + deliveryTime);
  } else {
    let deliveryTime;
    if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
    else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
    else deliveryTime = 4;
    return anOrder.placeOn.plusDays(2 + deliveryTime);
  }
}

// 명시적인 함수를 사용해 호출자의 의도를 명확하게 드러내야 한다.

// 조건문 분해하기 적용

function deliveryDate(anOrder, isRush) {
  if (isRush) return rushDeliveryDate(anOrder);
  else return regularDeliveryDate(anOrder);
}

function rushDeliveryDate(anOrder) {
  let deliveryTime;
  if (["MA", "CT"].includes(anOrder.deliveryState)) deliveryTime = 1;
  else if (["NY", "NH"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else deliveryTime = 3;
  return anOrder.placeOn.plusDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
  let deliveryTime;
  if (["MA", "CT", "NY"].includes(anOrder.deliveryState)) deliveryTime = 2;
  else if (["ME", "NH"].includes(anOrder.deliveryState)) deliveryTime = 3;
  else deliveryTime = 4;
  return anOrder.placeOn.plusDays(2 + deliveryTime);
}
