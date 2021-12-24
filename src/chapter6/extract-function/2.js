function aPrintOwing(invoice) {
  let outstanding = 0;
  console.log("**********");
  console.log("고객채무");
  console.log("**********");

  // 미해결 채무를 계산
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일 계산
  const today = Clock.today;
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );

  // 세부사항 출력하기
  console.log(`고객명: ${invoice.customer}\n`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}

//1. 배너출력하기
function printOwing(invoice) {
  let outstanding = 0;
  printBanner(); //<--요기
  // 미해결 채무를 계산
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  function printBanner() {
    console.log("**********");
    console.log("고객채무");
    console.log("**********");
  }
}

// 세부사항 출력하는 코드 추출

function aPrintOwing(invoice) {
  let outstanding = 0;

  printDetails(invoice, outstanding);
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}\n`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}

// 마감일 설정코드 추출

function aPrintOwing(invoice) {
  let outstanding = 0;

  // 마감일 계산
  recordDueDate(invoice);
}

function recordDueDate(invoice) {
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
}

// 최종

function printOwing(invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
  return invoice.orders.reduce((acc, cur) => acc + cur.amount, 0);
}
