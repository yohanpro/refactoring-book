orders.filter((o) => "high" === o.priority || "rush" === o.priority);

orders.filter((o) => o.priority.higherThan(new Priority("normal")));

// 레코드에서 데이터를 읽어들이는 단순한 Order class를 살펴본다.
// 이클래스의 priority 속성은 단순히 문자열로 표현한다.

class Order {
  constructor(data) {
    this.priority = data.priority;
  }
}

// 클라이언트
highPriorityCount = orders.filter(
  (o) => "high" === o.priority || "rush" === o.priority
).length;

// 1단계 우선 변수부터 캡슐화한다.

class Order {
  get priority() {
    return this._priority;
  }
  set priority(aString) {
    this._priority = aString;
  }
}

// 필드를 자가 캡슐화하면 필드 이름을 바꿔도 클라이언트 코드는 유지가 가능하다.

// 우선순위 속성을 표현하는 값 클래스 Priority를 만든다.

class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value;
  }
}

//이제 방금 만든 Priority 클래스를 사용하도록 접근자를 수정한다.
class Order {
  get priority() {
    return this._priority.toString();
  }
  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// getter는 문자열을 반환하므로 함수 이름을 바꿔준다.

class Order {
  get priorityString() {
    return this._priority.toString();
  }
  set priority(aString) {
    this._priority = new Priority(aString);
  }
}

// 클라

highPriorityCount = orders.filter(
  (o) => "high" === o.priorityString || "rush" === o.priorityString
).length;

//더 가다듬기
// Priority 객체를 제공하는 게터를 Order클래스에 만드는 편이 낫겠다고 판단.

class Order {
  get priority() {
    return this._priority;
  }
  get priorityString() {
    return this._priority.toString();
  }
  set priority(aString) {
    this._priority = new Priority(aString);
  }
}
//Priority 클래스는 다른 곳에서도 유용할수 있다. Order의 세터가 Priority 인스턴스를 받도록 해주면 좋다.

class Priority {
  constructor(value) {
    if (value instanceof Priority) {
      return value;
    }
    this._value = value;
  }
}

//Priority 객체를 제공하는 게털르 Order 클래스에 만드는 방법

class Priority {
  constructor(value) {
    if (value instanceof Priority) {
      return value;
    }

    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`${value} is not a legal value`);
    }
  }

  toString() {
    return this._value;
  }
  get _index() {
    return Priority.legalValues().findIndex((v) => v === this._value);
  }

  static legalValues() {
    return ["normal", "high", "rush"];
  }
  equals(other) {
    return this._value === other._value;
  }
  higherThan(other) {
    return this._index > other._index;
  }
  lowerThan(other) {
    return this._index < other._index;
  }
}

//이렇게 작성하면 좀 더 의미있게 사용할 수 있다.

highPriorityCount = orders.filter((o) =>
  o.priority.higherThan(new Priority("normal"))
).length;
