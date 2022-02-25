let temp = 2 * (height + width);
console.log(temp);

temp = height * width;

//// after

const perimeter = 2 * (height + width);
console.log("perimeter", perimeter);
const area = height * width;
console.log("area", area);

/////////////////////
// 해기스라는 음식이 전파된 거리를 구한는 코드
// 해기스가 발상지에서 초기 힘을 받아 일정한 가속도로 전파되다가, 어떠한 계기로 두번째 힘을 받아 전파속도가 빨라진다.

function distanceTravelled(scenario, time) {
  let result;
  let acc = scenario.primaryForce / scenario.mass; // 가속도(a) = 힘(F) / 질량(m)
  let primaryTime = Math.min(time, scenario.delay);

  result = 0.5 * acc * primaryTime * primaryTime; // 초기 시작 시간에서 시작 시간까지의 전방 이동 거리

  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay;
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result +=
      primaryVelocity * secondaryTime +
      0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

// acc변수에 값이 두번 대입된다. 역할이 두개라는 신호다.
// 첫번째힘이 유발한 초기 가속도를 저장하는 역할
// 두번째힘까지 반영된 후의 가속도를 저장하는 역할이다.

// 1. 변수에 새로운 이름을 지어주고 , 2. 선언시 const를 붙여 불변으로 만든다
// 3.두 번째 대입전까지의 모든 참조를 새로운 이름으로 만든다.
// 4. 두 번째 대입할 때 변수를 다시 선언한다.

function distanceTravelled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass; //12
  let primaryTime = Math.min(time, scenario.delay);

  result = 0.5 * primaryAcceleration * primaryTime * primaryTime; //3

  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay;
    let acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass; //4
    result +=
      primaryVelocity * secondaryTime +
      0.5 * acc * secondaryTime * secondaryTime;
  }
  return result;
}

// 두번째 대입 처리

function distanceTravelled(scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass; //12
  let primaryTime = Math.min(time, scenario.delay);

  result = 0.5 * primaryAcceleration * primaryTime * primaryTime; //3

  let secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    let primaryVelocity = acc * scenario.delay;
    const secondaryAccelartion =
      (scenario.primaryForce + scenario.secondaryForce) / scenario.mass; //4
    result +=
      primaryVelocity * secondaryTime +
      0.5 * secondaryAccelartion * secondaryTime * secondaryTime;
  }
  return result;
}

// 단계 나누기 필요

// 입력 매개변수의 값을 수정할때
function discount(inputValue, quantity) {
  if (inputValue > 50) inputValue = inputValue - 2;
  if (quantity > 100) quantity = quantity - 1;
  return inputValue;
}

// 자바스크립트의 매개변수는 값에 의한 호출로 전달되므로 inputvalue를 수정해도 호출자에 영향을 주지 않는다.

// inputValue를 쪼갠다.
function discount(originalInputValue, quantity) {
  let inputValue = originalInputValue;
  if (inputValue > 50) inputValue = inputValue - 2;
  if (quantity > 100) quantity = quantity - 1;
  return inputValue;
}

// 변수 이름 바꾸기를 수행한다.

function discount(inputValue, quantity) {
  let result = inputValue;
  if (inputValue > 50) result = result - 2;
  if (quantity > 100) result = result - 1;
  return result;
}
