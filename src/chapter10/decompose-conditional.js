// 여름철이면 할인율이 달라지는 어떤 서비스의 요금 계산

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

// 우선 조건부분을 별도 함수로 추출한다.

if (summer()) {
  charge = quantity * plan.summerRate;
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

function summer() {
  return !aDate.isBefore(plan.summerRate) && !aDate.isAfter(plan.summerRate);
}

// 조건이 만족했을때의 로직도 또 다른 함수로 추출한다.

if (summer()) {
  charge = summerCharge();
} else {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}

function summer() {
  return !aDate.isBefore(plan.summerRate) && !aDate.isAfter(plan.summerRate);
}

function summerCharge() {
  return quantity * plan.summerRate;
}

// else절도 별도 함수로 추출한다.

if (summer()) {
  charge = summerCharge();
} else {
  charge = regularCharge();
}

function summer() {
  return !aDate.isBefore(plan.summerRate) && !aDate.isAfter(plan.summerRate);
}

function summerCharge() {
  return quantity * plan.summerRate;
}
function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

// 3항 연산자를 사용할 수도 있다.

charge = summer() ? summerCharge() : regularCharge();
