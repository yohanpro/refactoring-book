if (anEmployee.seniority < 2) {
  return 0;
}

if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;

if (isNotEligibleForDisablity()) return 0;

function isNotEligibleForDisablity() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}
