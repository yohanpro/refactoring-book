const organization = { name: "John", country: "KR" };

class Organization {
  construtor(data) {
    this._name = data.name;
    this.country = data.country;
  }

  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aString) {
    this._country = aString;
  }
}

// 이름을 변경해야할 게 많아보이지만, 오히려 더 쉬워졌따. 작은 단계들로 나누어서 독립적으로 수행할수 있게 되었기 때문이다.
class Organization {
  construtor(data) {
    this._title = data.name;
    this.country = data.country;
  }

  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aString) {
    this._country = aString;
  }
}

// 생성자에서 title도 받아들일수 있도록 조치한다.

class Organization {
  construtor(data) {
    this._title = data.title !== undefined ? data.title : data.name;
    this.country = data.country;
  }

  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aString) {
    this._country = aString;
  }
}

// 이렇게 되면 호출하는 쪽에서 name과 title 둘 다 사용할 수있게 되었다. 일단 오류는 나지 않게 만든 것이다.
// 호출하는 쪽에서 title을 사용하도록 하나씩 수정한다.

const organization = new Organization({ title: "John", country: "KR" });

// 모두 수정했다면 생성자에서 name을 사용할수 있게 하던 코드를 제거한다.
class Organization {
  construtor(data) {
    this._title = data.title;
    this.country = data.country;
  }

  get name() {
    return this._name;
  }
  set name(aString) {
    this._name = aString;
  }

  get country() {
    return this._country;
  }

  set country(aString) {
    this._country = aString;
  }
}
