// 전력회사는 전력이 필요한 현장에 인프라를 설치해 서비스를 제공한다.

class Site {
  get customer() {
    return this._customer;
  }
}

class Customer {
  get name() {
    // 고객 이름
  }
  get billingPlan() {
    // 요금제
  }
  set billingPlan(arg) {}
  get paymentHistory() {
    // 납부 이력
  }
}

// 누군지 모르는 미확인 고객이 나올수 있으므로 미확인 코드를 처리할 수 있어야 한다. 보통 지저분하게 되면 이렇게 되어있다.

// Client 1

const aCustomer = site.customer;
let customerName;
if (aCustomer === "미확인 고객") customerName = "거주자";
else customerName = aCustomer.name;

// Client 2
const plan =
  aCustomer === "미확인 고객"
    ? CustomElementRegistry.billingPlans.basic
    : aCustomer.billingPlan;

// Client 3
if (aCustomer === "미확인 고객") {
  aCustomer.billingPlan = newPlan;
}

// Client 4

const weesDelinquent =
  aCustomer === "미확인 고객"
    ? 0
    : aCustomer.paymentHistory.weeksDelinquentInLastYear;

// 미확인 고객인지를 나타내는 메서드를 고객 클래스에추가한다.

class Customer {
  get isUnKnown() {
    return false;
  }
}

// 미확인 고객 전용 클래스를 만든다.

class UnKnownCustomer {
  get isUnKnown() {
    return true;
  }
}

// 여러곳에서 똑같이 수정해야 하는 코드를 별도의 함수로 추출하여 한데로 모은다.
// 의도치 않은 값이 입력되면 에러를 던지게 하였다. 이렇게 하면 리팩토링 도중 실수를 저지르가나, 혹은 이상하게 동작하는 위치를 찾는데 도움이 된다.
function isUnKnown(arg) {
  if (!(arg instanceof Customer) || arg === "미확인 고객")
    throw new Error(`잘못된 값과 비교 ${arg}`);
  return arg === "미확인 고객";
}

// 이 isUnknown 함수슬 이용해 미확인 고객인지를 확인할 수 있다. 한 번에 하나씩해보자.

// Client1;
let customerName;
if (isUnKnown(aCustomer)) customerName = "거주자";
else customerName = aCustomer.name;

// Client 2
const plan = isUnKnown(aCustomer)
  ? registry.billingPlans.basic
  : aCustomer.billingPlan;

// Client 4

const weesDelinquent = isUnKnown(aCustomer)
  ? 0
  : aCustomer.paymentHistory.weeksDelinquentInLastYear;

//호출하는 곳에서 모두 isUnknown을 사용하도록 수정했다면, Site 클래스가 UnKnown 객체를 반환하도록 수정한다.

class Site {
  get customer() {
    return this._customer === "미확인 고객"
      ? new UnKnownCustomer()
      : this._customer;
  }
}

function isUnKnown(arg) {
  if (!(arg instanceof Customer) || arg instanceof UnKnownCustomer)
    throw new Error(`잘못된 값과 비교 ${arg}`);
  return arg.isUnKnown;
}

class UnKnownCustomer {
  get name() {
    return "거주자";
  }
}

// 이렇게 하면 조건부 코드는 지우면 된다.

const customerName = aCustomer.name;

class UnKnownCustomer {
  get name() {
    return "거주자";
  }
  get billingPlan() {
    return registry.billingPlans.basic;
  }

  set billingPlan(arg) {
    // 무시
  }
}

// 클라이언트 4번은 더 특이한데, 객체를 반환하기 때문이다. (지불이력)
// 특이 케이스가 다른 객체를 반환해야 한다면 그 객체 역시 특이 케이스여얗 ㅏㄴ다.

class UnKnownCustomer {
  get name() {
    return "거주자";
  }
  get billingPlan() {
    return registry.billingPlans.basic;
  }

  set billingPlan(arg) {
    // 무시
  }
  get paymentHistory() {
    return new NullPaymentHistory();
  }
}

class NullPaymentHistory {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

// 이렇게 모두 수정했다면, 호출하는 곳이 없어진 isUnknown 전역함수를 제거한다.
