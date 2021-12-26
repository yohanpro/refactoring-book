// 고객이 뉴잉글랜드에 살고 있는지 확인
function inNewEngland(aCustomer) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}

// 호출시
const newEnglanders = somecustomers.filter((c) => inNewEngland(c));

/**
 * 여기서 하는 것은 기존에는 고객을 받아서 이를 처리했다면, 이제는 주 이름을 넘겨받아서 이를 처리하도록 만들었다는 것이다.
 * 이렇게 하면 고객에 대한 의존성이 줄어든다.
 */

function inNewEngland(aCustomer) {
  const stateCode = aCustomer.address.state; // 매개변수로 사용할 코드 추출
  return xxInNewEngland(stateCode);
}

function xxInNewEngland(stateCode) {
  return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}

// 그 다음 함수 인라인하기로 본문을 호출문에 집어넣는다.
// 기존 함수 호출문을 새 함수 호출문으로 교체한다.

const newEnglanders = somecustomers.filter((c) =>
  xxInNewEngland(c.address.state)
);

// 마지막으로 새 함수의 이름을 기존 함수 이름으로 바꾼다.
