import { assert } from "console";
import _ from "lodash";
// short logic

function base(aReading) {}
function taxableCharge(aReading) {}

// to
function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}

/**
 * 대체적으로 6.9장과 같으나 원본데이터가 코드내에서 변경될이 없을때 사용
 */

reading = { customer: "john", quantity: 10, month: 5, year: 2022 };

const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.customer));

// 이렇게 중복 코드가 생기게 되면 나중에 무조건 수정할 일이 생긴다.
// 함수 추출하기를 할 수 있지만 어디에 있는지 모를때도 많다.
// 실제로 아래와 같이 이미 쓰고 있는 것이 있다.

const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

// 변환단계에서 미가공 측정값을 받고 다양한 가공정보를 덧붙여서 반환한다.

// 1. 입력객체를 그대로 깊은 복사해서 반환하는 함수를 만든다.
function enrichReading(original) {
  const result = _.cloneDeep(original);
  return result;
}

// 2. 이제 변경하려는 계산 로직 중에 하나를 고르고 , 측정값을 전달하기 전에 부가 정보를 덧붙이도록 수정한다.

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

// 3. calculateBaseCharge를 부가정보를 덧붙이는 코드 근처로 옮긴다.
function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  return result;
}

// 4. 이제 이 함수를 사용하던 클라이언ㅇ트가 부가 정보를 담은 필드를 사용하도록 변경한다.

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;

// 원본 레코드의 값은 바뀌면 안된다는것을 보장하기 위해 테스트를 작성해두자.

it("check reading unchanged", () => {
  const baseReading = { customer: "ivan", quantity: 15, month: 5, year: 2021 };
  const oracle = _.cloneDeep(baseReading);
  enrichReading(baseReading);
  assert.deepEqual(baseReading, oracle);
});

// 이제 이 필드를 사용하도록 수정해주자.

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;

// 세금을 계산하는 클라이언트도 바꾸어 보자.
// 1. 형식을 가져오도록 한다.
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const base = aReading.baseCharge;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.customer));

// 2. taxableCharge를 enrich로 옮기자.
function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.customer)
  );
  return result;
}

// 문제가 없다면 base 변수를 인라인해버린다.

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = Math.max(
  0,
  aReading.baseCharge - taxThreshold(aReading.customer)
);

// 변환함수로 옮긴다.

function enrichReading(original) {
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(
    0,
    result.baseCharge - taxThreshold(result.year)
  );
  return result;
}

//이제 원본 코드를 수정한다.

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;
