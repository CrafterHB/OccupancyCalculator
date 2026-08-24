const form = document.querySelector("form");
const resultText = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const length = document.querySelector("#length");
  const width = document.querySelector("#width");
  const exitFootage = document.querySelector("#exit-footage");

  const selectedOccupancy = document.querySelector(
    'input[name="occupancy-use"]:checked',
  );
  const selectedExitDischarge = document.querySelector(
    'input[name="exit-discharge"]:checked',
  );

  if (!selectedOccupancy || !selectedExitDischarge) {
    resultText.textContent =
      "Please select an occupancy and exit discharge option.";
    return;
  }

  const lengthAmt = Number(length.value);
  const widthAmt = Number(width.value);
  const occupancyFactor = Number(selectedOccupancy.value);
  const exitFootageAmt = Number(exitFootage.value);
  const exitDischargeFactor = Number(selectedExitDischarge.value);

  let box1 = lengthAmt * widthAmt;
  box1 /= occupancyFactor;

  let box2 = exitFootageAmt * exitDischargeFactor;

  let result = (box1 / box2) * 100;

  resultText.textContent = `Occupancy readiness: ${result.toFixed(2)}%`;
});
