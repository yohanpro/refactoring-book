function getTotalOutstandingAndSendBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amout + total,
    0
  );
  sendBill();
  return result;
}

// To

function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}

//////////////////////////////////////////////////////////////////////

// 이름 목록을 훑어 악당(miscreant)을 찾는다. 악당을 찾으면 그 사람의 이름을 반환하고 경고를 울린다.

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }
    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }

  return "";
}

// 첫번째는 함수를 복제하고 질의 목적에 맞는 이름짓기이다.

function findMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }
    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }

  return "";
}

// 새 질의함수에서 부수효과를 삭제한다.

function findMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      return "조커";
    }
    if (p === "사루만") {
      return "사루만";
    }
  }
  return "";
}

// 원래 함수를 호출하는 곳을 모두 찾아 새로운 질의 함수를 호출하도록 바꾸고, 이어서 원래의 변경함수를 호출하는 코드를 바로 아래에 삽입한다.

const found = findMiscreant(people);
alertForMiscreant(people);

// 이제 원래의 함수에서 질의 관련 코드를 삭제한다.

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return;
    }
    if (p === "사루만") {
      setOffAlarms();
      return;
    }
  }
  return;
}

// 변경함수에서 질의함수를 사용하도록 고친다.

function alertForMiscreant(people) {
  if (findMiscreant(people) !== "") setOffAlarms();
}
