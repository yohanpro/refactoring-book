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

////////////

// "1920":{
//   name:"김요한",
//   id:"1920",
//   usages:{
//     "2022":{
//       "1": 50,
//       "2":55,

//     },
//     "2021":{
//       "1":70,
//       "2":75,
//     }
//   }
// }

// 이런식으로 생긴 레코드는 사용하려면 이렇게 써야 할 것이다.
const abc = (customerData[customerID].usages[year][month] = amount);

function compareUsage(customerID, laterYear, month) {
  const later = customerData[customerID].usages[laterYear][month];
  const earlier = customerData[customerID].usages[laterYear - 1][month];
  return {
    laterAmount: later,
    change: later - earlier,
  };
}

// 일단 변수 캡슐화부터 한다.

function getRawDataOfCustomers() {
  return customerData;
}
function setRawDataOfCustomers(data) {
  customerData = data;
}

// 그러면 이렇게 쓸 수 있다.
getRawDataOfCustomers()[customerID].usages[year][month] = amount;
function compareUsage(customerID, laterYear, month) {
  const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
  const earlier =
    getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];
  return {
    laterAmount: later,
    change: later - earlier,
  };
}
// 그 후 전체 데이터 구조를 표현하는 클래스를 정의하고, 이를 반환하는 함수를 새로 만든다.

class CustomerData {
  constructor(data) {
    this._data = data;
  }
}
//
function getCustomerData() {
  return customerData;
}
function getRawDataOfCustomers() {
  return customerData._data;
}

function setRawDataOfCustomers(arg) {
  customerDataData = new CustomerData(arg);
}

// 데이터 구조 안으로 깊이 들어가서 세터로 뽑아내는 작업을 한다.

//쓰기 예시
setUsage(customerId, year, month, amount);

function setUsage(customerId, year, month, amount) {
  return (getRawDataOfCustomers()[customerId].usages[year][month] = amount);
}

// 이 함수를 고객 데이터 클래스로 옮긴다.
// 사용예시
getCustomerData().setUsage(customerId, year, month, amount);

// 이 함수를 고객 데이터 클래스로 옮긴다.
class CustomerData {
  constructor(data) {
    this._data = data;
  }
  setUsage(customerId, year, month, amount) {
    this._data[customerId].usages[year][month] = amount;
  }
}

// 값을 수정하는 부분을 명확하게 드러내고 한곳에 모아두는 일이 중요하다.

// 빠진 부분이 없는지는 데이터를 깊은복사해서 반환하여 본다.

//
function getCustomerData() {
  return customerData;
}
function getRawDataOfCustomers() {
  return customerData._data;
}

function setRawDataOfCustomers(arg) {
  customerDataData = new CustomerData(arg);
}

class CustomerData {
  constructor(data) {
    this._data = data;
  }
  setUsage(customerId, year, month, amount) {
    this._data[customerId].usages[year][month] = amount;
  }
  get rawData() {
    return _.cloneDeep(this.data);
  }
}

////////////

// 읽을때는 여러가지 방법이 있다.

// 읽는 코드를 모두 독립 함수로 추출한다.

class CustomerData {
  constructor(data) {
    this._data = data;
  }
  setUsage(customerId, year, month, amount) {
    this._data[customerId].usages[year][month] = amount;
  }
  get rawData() {
    return _.cloneDeep(this.data);
  }
  usage(customerId, year, month) {
    return this._data[customerId].usages[year][month];
  }
}
