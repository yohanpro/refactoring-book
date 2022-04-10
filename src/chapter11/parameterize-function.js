function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}

// after

function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}

////////////////////////////////////////////////////

function baseChare(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
    bottomBand(usage) * 0.03 + middleBand(usage) * 0.05 + topBand(usage) * 0.07;

  return usd(amount);
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}
function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}

// 비슷한 함수들을 매개변수화하여 통합할때에는 먼저 대상 함수를 하나로 골라 매개변수로 추가한다.
// middleBand는 리터럴을 두개 사용하며, 그 각각은 중갠대역의 하한, 상한을 뜻한다.

function withinBand(usage, bottom, top) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}
function baseChare(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
    bottomBand(usage) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    topBand(usage) * 0.07;

  return usd(amount);
}

// 함수에서 사용하던 리터럴들을 적절한 매개변수로 대체한다.
function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, 200) - bottom : 0;
}

function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

// 대역의 하한을 호출하는 부분도 바꿔준다.

function baseChare(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    topBand(usage) * 0.07;

  return usd(amount);
}

//상한 호출은 Infinity를 사용한다.

function baseChare(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;

  return usd(amount);
}
