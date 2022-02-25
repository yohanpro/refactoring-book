let average = 0;
let totalSalary = 0;

for (const p of people) {
  average += p.average;
  totalSalary += p.salary;
}

averageAge = averageAge / people.length;

// after

let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}

let averageAge = 0;

for (const p of people) {
  averageAge += p.age;
}

averageAge = averageAge / people.length;

//////////////////////////////////////////////////////////////////////

// 예시 : 전체 급여와 가장 어린 나이를 계산하는 코드

let youngest = people[0] ? people[0].age : Infinity;

let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여 : ${totalSalary}`;

// 1. 단순히 반복문을 복제한다.

let youngest = people[0] ? people[0].age : Infinity;

let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여 : ${totalSalary}`;

//2. 중복을 제거하자.
let youngest = people[0] ? people[0].age : Infinity;

let totalSalary = 0;

for (const p of people) {
  totalSalary += p.salary;
}

for (const p of people) {
  if (p.age < youngest) youngest = p.age;
}

return `최연소: ${youngest}, 총 급여 : ${totalSalary}`;

/// 더 가다듬기

let totalSalary = 0;

for (const p of people) {
  totalSalary += p.salary;
}

let youngest = people[0] ? people[0].age : Infinity;
for (const p of people) {
  if (p.age < youngest) youngest = p.age;
}

// 각 반복문을 함수로 추출한다.

return `최연소: ${youngestAge()}, 총 급여 : ${totalSalary()}`;

function totalSalary() {
  let totalSalary = 0;
  for (const p of people) {
    totalSalary += p.salary;
  }
  return totalSalary;
}

function youngestAge() {
  let youngest = people[0] ? people[0].age : Infinity;
  for (const p of people) {
    if (p.age < youngest) youngest = p.age;
  }

  return youngest;
}

// 반복문을 파이프라인으로 바꾸고 , 최연소 계산 코드에는 알고리즘 교체하기를 사용한다.

function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0);
}
function youngestAge() {
  return Math.min(...people.map((p) => p.age));
}

const getTodos = () => {};
