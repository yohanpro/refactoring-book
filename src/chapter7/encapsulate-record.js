const organization = { name: "김요한", country: "KR" };

class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }

  set name(arg) {
    return (this._name = arg);
  }

  get country() {
    return this._country;
  }

  set country(arg) {
    this._country = arg;
  }
}

//////////
const organization = { name: "김요한", country: "KR" };

result += `<h1>${organization.name}</h1>`;
organization.name = newName;

// 상수의 캡슐화
function getRawDataOfOrganization() {
  return organization;
}

result += `<h1>${getRawDataOfOrganization().name}</h1>`;
getRawDataOfOrganization().name = newName;

// 임시로만 사용할 것이기 때문에 이상한 이름을 일단 붙여 놓는다.

class Organization {
  constructor(data) {
    this._data = data;
  }
}

const organization = new Organization({ name: "김요한", country: "KR" });

function getRawDataOfOrganization() {
  return organization._data;
}

function getOrganization() {
  return organization;
}

class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }

  set name(arg) {
    return (this._name = arg);
  }

  get country() {
    return this._country;
  }

  set country(arg) {
    this._country = arg;
  }
}
