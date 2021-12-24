function aPrintOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  // 세부사항 출력하기
  console.log(`고객명: ${invoice.customer}\n`);
  console.log(`채무액: ${outstanding}`);
}

function printOwing() {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails();

  function printDetails(outstanding) {
    console.log(`고객명: ${invoice.customer}\n`);
    console.log(`채무액: ${outstanding}`);
  }
}
