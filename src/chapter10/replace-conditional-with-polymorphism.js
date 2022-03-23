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
