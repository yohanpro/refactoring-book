function foo() {
  switch (bird.type) {
    case "유럽제비":
      return "보통이다";
    case "아프리카 제비":
      return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
    case "노르웨이 파랑 앵무":
      return bird.voltage > 100 ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
}

class EuropeanSwallow {
  get plumage() {
    return "보통이다";
  }
}

class AfricanSwallow {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
}

class NorwegianBlueParrot {
  get plumage() {
    return this.voltage > 100 ? "그을렸다" : "예쁘다";
  }
}

////////

// 다양한 새를 키우는 친구가 새의 종에 따른 비행속도와 깃털 상태를 알고 싶어 한다.

function plumages(birds) {
  return new Map(birds.map((b) => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map((b) => [b.name, airSpeedVelocity(b)]));
}

function plumage(bird) {
  //깃털상태
  switch (bird.type) {
    case "유럽제비":
      return "보통이다";
    case "아프리카 제비":
      return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
    case "노르웨이 파랑 앵무":
      return bird.voltage > 100 ? "그을렸다" : "예쁘다";
    default:
      return "알 수 없다";
  }
}

function airSpeedVelocity(bird) {
  switch (bird.type) {
    case "유럽제비":
      return 35;
    case "아프리카 제비":
      return 40 - 2 * bird.numberOfCoconuts;
    case "노르웨이 파랑 앵무":
      return bird.isNailed ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}

// 새 종류에 따라 다르게 동작하는 함수가 있다. 종류별로 클래스를 만들어서 각각에 맞는 동작을 표현하는게 좋을것 같다.

// 먼저 airSpeedVelocity()와 plumage()를 Bird라는 클래스로 묶는다.

function plumage(bird) {
  return new Bird(bird).plumage;
}

function airSpeedVelocity(bird) {
  return new Bird(bird).airSpeedVelocity;
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }
  get plumage() {
    //깃털상태
    switch (bird.type) {
      case "유럽제비":
        return "보통이다";
      case "아프리카 제비":
        return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
      case "노르웨이 파랑 앵무":
        return bird.voltage > 100 ? "그을렸다" : "예쁘다";
      default:
        return "알 수 없다";
    }
  }
  get airSpeedVelocity() {
    switch (bird.type) {
      case "유럽제비":
        return 35;
      case "아프리카 제비":
        return 40 - 2 * bird.numberOfCoconuts;
      case "노르웨이 파랑 앵무":
        return bird.isNailed ? 0 : 10 + bird.voltage / 10;
      default:
        return null;
    }
  }
}

//종별 서브클래스를 만든다. 그리고 객체를 얻을때 팩터리 함수를 사용하도록 수정한다.

function plumage(bird) {
  return createBird(bird).plumage;
}

function airSpeedVelocity(bird) {
  return createBird(bird).airSpeedVelocity;
}

function createBird(bird) {
  switch (bird.type) {
    case "유럽제비":
      return new EuropeanSwallow(bird);
    case "아프리카 제비":
      return new AfricanSwallow(bird);
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class EuropeanSwallow extends Bird {}
class AfricanSwallow extends Bird {}
class NorwegianBlueParrot extends Bird {}

// 조건부의 메소드를 처리한다.
class EuropeanSwallow extends Bird {
  get plumage() {
    return "보통이다.";
  }
}

class Bird {
  get plumage() {
    //깃털상태
    switch (bird.type) {
      case "유럽제비":
        throw "오류 발생";
      case "아프리카 제비":
        return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
      case "노르웨이 파랑 앵무":
        return bird.voltage > 100 ? "그을렸다" : "예쁘다";
      default:
        return "알 수 없다";
    }
  }
}

// 슈퍼클래스 조건문에 throw문을 추가한다. 왜냐하면 유럽제비는 하위클래스에서 받아서 사용해야 하기 때ㅜㅁ니다.
// 쭉쭉 이어나간다.

class AfricanSwallow extends Bird {
  get plumage() {
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
}
class NorwegianBlueParrot extends Bird {
  get plumage() {
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  }
}

// 슈퍼클래스의 메소드는 기본 동작용으로 남겨둔다.

class Bird {
  get plumage() {
    return "알 수 없다.";
  }
}

// 같은 과정을 airSpeedVelocity에도 적용한다.

function plumages(birds) {
  return new Map(
    birds.map((b) => createBird(b)).map((bird) => [bird.name, bird.plumage])
  );
}

function speeds(birds) {
  return new Map(
    birds
      .map((b) => createBird(b))
      .map((bird) => [bird.name, bird.airSpeedVelocity])
  );
}

function createBird(bird) {
  switch (bird.type) {
    case "유럽제비":
      return new EuropeanSwallow(bird);
    case "아프리카 제비":
      return new AfricanSwallow(bird);
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }
  get plumage() {
    return "알 수 없다.";
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return "보통이다.";
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return bird.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }

  get airSpeedVelocity() {
    return 40 - 2 * bird.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return bird.voltage > 100 ? "그을렸다" : "예쁘다";
  }

  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

//변형동작을 다형성으로 표현하기

// 신용평가기관에서 선박의 항해투자드급을 계산하는 코드

function rating(voyage, history) {
  // 투자 등급
  const vpf = voyageProfitFactor(voyage, history);
  const vr = voyageRisk(voyage);
  const chr = captainHistoryRisk(voyage, history);

  if (vpf * 3 > vr + chr * 2) return "A";
  else return "B";
}

function voyageRisk(voyage) {
  //항해 경로 위험요소
  let result = 1;
  if (voyage.length > 4) result += 2;
  if (voyage.length > 8) result += voyage.length - 8;
  if (["중국", "동인도"].includes(voyage.zone)) result += 4;
  return Math.max(result, 0);
}

function captainHistoryRisk(voyage, history) {
  //선장의 항해 이력 위험요소
  let result = 1;
  if (history.length < 5) result += 4;
  result += history.filter((v) => v.profit < 0).length;
  if (voyage.zone === "중국" && hasChina(history)) result -= 2;
  return Math.max(result, 0);
}
function hasChinia(history) {
  //중국을 경유하는가?
  return history.some((v) => "중국" === v.zone);
}

function voyageProfitFactor(voyage, history) {
  // 수익 요인
  let result = 2;
  if (voyage.zone === "중국") result += 1;
  if (voyage.zone === "동인도") result += 1;
  if (voyage.zone === "중국" && hasChina(history)) {
    result += 3;
    if (history.length > 10) result += 1;
    if (voyage.length > 12) result += 1;
    if (voyage.length > 18) result += 1;
  } else {
    if (history.length > 8) result += 1;
    if (voyage.length > 14) result += 1;
  }

  return result;
}

// 호출하는쪽 코드는 다음과 같다.

const voyage = { zone: "서인도", length: 10 };
const history = [
  { zone: "중국", profit: -2 },
  { zone: "동인도", profit: 5 },
  { zone: "서인도", profit: 15 },
  { zone: "서아프리카", profit: 7 },
];

const myRating = rating(voyage, history);

// 중국까지 항해해본 선장이 중국을 경유해 항해할 때를 다루는 조건부 로직들이 중요하다.
// 다녀온 바 있는 중국으로의 항해시 추가될 특별한 로직이 더 많았다면 효과가 더 컸을 것이다.
//우선 세부계산을 수행하는 함수들을 먼저 처리한다.

function rating(voyage, history) {
  return new Rating(voyage, history).value;
}

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) return "A";
    else return "B";
  }

  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["중국", "동인도"].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    if (this.voyage.zone === "중국" && this.hasChinaHistory) result -= 2;
    return Math.max(result, 0);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "중국") result += 1;
    if (this.voyage.zone === "동인도") result += 1;
    if (this.voyage.zone === "중국" && this.hasChinaHistory) {
      result += 3;
      if (this.history.length > 10) result += 1;
      if (this.voyage.length > 12) result += 1;
      if (this.voyage.length > 18) result += 1;
    } else {
      if (this.history.length > 8) result += 1;
      if (this.voyage.length > 14) result += 1;
    }

    return result;
  }

  get hasChinaHistory() {
    return this.history.some((v) => v.zone === "중국");
  }
}

//기본 동작을 담당할 클래스가 만들어졌다. 이체 변형 동작을 담을 빈 서브클래스를 만든다.

class ExperienceChinaRating extends Rating {}

// 변형클래스를 반환해줄 팩터리 함수를 만든다.

function createRating(voyage, history) {
  if (voyage.zone === "중국" && history.some((v) => "중국" === v.zone)) {
    return new ExperienceChinaRating(voyage, history);
  } else {
    return new Rating(voyage, history);
  }
}

// 생성자를 호출하는 코드를 모두 찾아서 이 팩터리 함수를 대신 사용하도록 수정한다.

function rating(voyage, history) {
  return createRating(voyage, history).value;
}
class Rating {
  //중간 생략
  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    if (this.voyage.zone === "중국" && this.hasChinaHistory) result -= 2;
    return Math.max(result, 0);
  }
}

//서브클래스에서 이 메서드를 오버라이드한다.
class ExperienceChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }
}

class Rating {
  //중간 생략
  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    // if (this.voyage.zone === "중국" && this.hasChinaHistory) result -= 2;  <-- 여기가 제거된다.
    return Math.max(result, 0);
  }
}

// voyageProfitFactor에서 변형동작을 분리하자.
// 먼저 해당 조건부 블록 전체를 함수로 추출한다.

class Rating {
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "중국") result += 1;
    if (this.voyage.zone === "동인도") result += 1;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.voyage.zone === "중국" && this.hasChinaHistory) {
      result += 3;
      if (this.history.length > 10) result += 1;
      if (this.voyage.length > 12) result += 1;
      if (this.voyage.length > 18) result += 1;
    } else {
      if (this.history.length > 8) result += 1;
      if (this.voyage.length > 14) result += 1;
    }
    return result;
  }
}
// 결과
class Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.history.length > 8) result += 1;
    if (this.voyage.length > 14) result += 1;
    return result;
  }
}
class ExperienceChinaRating extends Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result += 1;
    return result;
  }
}

/// 더 가다듬기

//And라는 의미 자체가 두 가지 일을 한다는 뜻이므로 분리해주어야 한다.

class Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += this.historyLengthFactor;
    if (this.history.length > 8) result += 1;

    return result;
  }
  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
}

// 같은 작업을 서브클래스에도 해준다.

class ExperienceChinaRating extends Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;
    result += this.historyLengthFactor;

    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result += 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }
}

//이제 super클래스에서는 문장을 호출한 곳으로 옮기기(8.4)를 적용할 수 있다.

class Rating {
  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "중국") result += 1;
    if (this.voyage.zone === "동인도") result += 1;
    result += this.historyLengthFactor;
    result += this.voyageAndHistoryLengthFactor;
  }
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }
}

class ExperienceChinaRating extends Rating {
  get voyageAndHistoryLengthFactor() {
    let result = 0;
    result += 3;

    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result += 1;
    return result;
  }
}
// 항해 거리 요인을 계산시 3점을 더하고 있는데 이 로직은 전체 결과를 계산하는 쪽으로 옮기는게 좋아보인다.
class ExperienceChinaRating extends Rating {
  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }

  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result += 1;
    return result;
  }
}

// 최종 결과

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) {
      return "A";
    } else return "B";
  }

  get voyageRisk() {
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (["중국", "동인도"].includes(this.voyage.zone)) result += 4;
    return Math.max(0, result);
  }

  get captainHistoryRisk() {
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(0, result);
  }

  get voyageProfitFactor() {
    let result = 2;
    if (this.voyage.zone === "중국") result += 1;
    if (this.voyage.zone === "동인도") result += 1;
    result += this.historyLengthFactor;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  get voyageLengthFactor() {
    return this.voyage.length > 14 ? -1 : 0;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
}

// 중국 항해경험이 있을때를 담당하는 클래스는 기본 클래스와의 차이만 담고 있다.

class ExperienceChinaRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(0, result);
  }
  get voyageLengthFactor() {
    let result = 0;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result += 1;
    return result;
  }

  get historyLengthFactor() {
    return this.history.length > 10 ? 1 : 0;
  }

  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }
}
