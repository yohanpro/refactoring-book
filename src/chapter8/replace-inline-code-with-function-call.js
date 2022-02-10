// Before

let appliesToMass = flase;
for (const s of states) {
  if (s === "MA") appliesToMass = true;
}

// After
appliesToMass = states.includes("MA");
