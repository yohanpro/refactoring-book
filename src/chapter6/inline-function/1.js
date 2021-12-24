// function getRating(driver) {
//   return moreThanFiveLateDeliveries(driver) ? 2 : 1;
// }

function moreThanFiveLateDeliveries(driver) {
  return driver.numverOfLateDeliveries > 5;
}

function getRating(driver) {
  return driver.numverOfLateDeliveries > 5 ? 2 : 1;
}

export function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

export function gatherCustomerData(out, aCustomer) {
  out.push(["name", aCustomer.name]);
  out.push(["location", aCustomer.location]);
}
