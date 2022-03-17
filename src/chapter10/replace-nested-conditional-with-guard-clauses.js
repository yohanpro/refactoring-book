function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalAmount();
      }
    }
  }
  return result;
}

///
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalAmount();
}

//////예시

function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    //퇴사한 직원인가?
    result = { amount: 0, reasonCode: "SEPARATED" };
  } else {
    if (employee.isRetired) {
      //은퇴한 직원인가?
      result = { amount: 0, reasonCode: "RETIRED" };
    } else {
      // 급여 계산
    }
  }
}

//중요한 일들이 중첨된 조건들에 가려서 잘 보이지 않는다.

// 일단 최상위 조건부터 보호 구문으로 바꾼다.

function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    //퇴사한 직원인가?
    return { amount: 0, reasonCode: "SEPARATED" };
  }

  if (employee.isRetired) {
    //은퇴한 직원인가?
    result = { amount: 0, reasonCode: "RETIRED" };
  } else {
    // 급여 계산
  }
  return result;
}

// 한 단계씩 올라간다.

function payAmount(employee) {
  let result;
  if (employee.isSeparated) {
    //퇴사한 직원인가?
    return { amount: 0, reasonCode: "SEPARATED" };
  }

  if (employee.isRetired) {
    //은퇴한 직원인가?
    return { amount: 0, reasonCode: "RETIRED" };
  }

  // 급여 계산
  return result;
}

// 이런식으로 단계를 밟아나가면서 제거해나간다.

// 조건 반대로 만들기

function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital > 0) {
    if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
      result =
        (anInstrument.income / anInstrument.duration) *
        anInstrument.adjustmentFactor;
    }
  }
  return result;
}

// 한번에 하나씩 수정해나간다.  이번에는 보호구문을 추가하면서 조건을 역으로 바꾼다.

function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) {
    return result;
  }

  if (anInstrument.interestRate > 0 && anInstrument.duration > 0) {
    result =
      (anInstrument.income / anInstrument.duration) *
      anInstrument.adjustmentFactor;
  }
  return result;
}

// 두번째는 복잡한데 간단히 not 연산자를 추가한다.

function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) {
    return result;
  }

  if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0)) {
    return result;
  }
  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;
  return result;
}

// 간소화시킨다.
function adjustedCapital(anInstrument) {
  let result = 0;
  if (anInstrument.capital <= 0) {
    return result;
  }

  if (anInstrument.interestRate <= 0 || anInstrument.duration <= 0) {
    return result;
  }
  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;
  return result;
}

//if문이 같은 결과를 내므로 조건식을 통합한다.
function adjustedCapital(anInstrument) {
  let result = 0;
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  ) {
    return result;
  }
  result =
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor;
  return result;
}

//변수를 제거한다.
function adjustedCapital(anInstrument) {
  let result = 0;
  if (
    anInstrument.capital <= 0 ||
    anInstrument.interestRate <= 0 ||
    anInstrument.duration <= 0
  ) {
    return 0;
  }

  return (
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor
  );
}
