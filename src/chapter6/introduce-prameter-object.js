// 아래처럼 공통된 매개변수를 여러개 받는 함수들이 존재한다면..

function amountInvoiced(startDate, endDate) {}
function amountReceived(startDate, endDate) {}
function amountOverdue(startDate, endDate) {}

// 아래처럼 바꾸어준다.
function amountInvoiced(aDataRange) {}
function amountReceived(aDataRange) {}
function amountOverdue(aDataRange) {}

// 온도 측정값 배열에서 정상 작동 범위가 벗어난 것이 있는지 검사하하는 코드

const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2022-01-01 09:10" },
    { temp: 53, time: "2022-01-01 09:20" },
    { temp: 58, time: "2022-01-01 09:30" },
    { temp: 53, time: "2022-01-01 09:40" },
    { temp: 51, time: "2022-01-01 09:50" },
  ],
};

function readingOutsideRange(station, min, max) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// 이걸 사용한다고 하면

alerts = readingOutsideRange(
  station,
  operationPlan.temperatureFloor, // 최저 온도
  operationPlan.temperatureCeiling // 최고 온도
);

// 데이터를 표한하는 클래스 선언

class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }

  get max() {
    return this._data.max;
  }
}

// 이 새로만든 객체를 readingsOutsideRange의 매개변수로 추가하도록 함수선언을 바꾸기

function readingOutsideRange(station, min, max, range) {
  return station.readings.filter((r) => r.temp < min || r.temp > max);
}

// 객체 형체로 전달하게끔 하나씩 바꾼다.

const range = new NumberRange(
  operationPlan.temperatureFloor,
  operationPlan.temperatureCeiling
);

alerts = readingOutsideRange(
  station,
  operationPlan.temperatureFloor,
  operationPlan.temperatureCeiling,
  range
);

// 실제로 매개변수를 사용하는 부분 변경
function readingOutsideRange(station, min, range) {
  //max가 제거됨
  return station.readings.filter((r) => r.temp < min || r.temp > range.max);
}

// 나머지 변경
function readingOutsideRange(station, range) {
  //min 제거됨
  return station.readings.filter(
    (r) => r.temp < range.min || r.temp > range.max
  );
}

// 이렇게 되면 호출문이 이렇게 바뀐다.

alerts = readingOutsideRange(station, range);

function readingOutsideRange(station, range) {
  return station.readings.filter((r) => !range.containes(r.temp));
}
class NumberRange {
  constructor(min, max) {
    this._data = { min, max };
  }
  get min() {
    return this._data.min;
  }

  get max() {
    return this._data.max;
  }
  contains(arg) {
    return arg >= this.min && arg <= this.max;
  }
}
