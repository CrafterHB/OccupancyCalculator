const form = document.querySelector("form");
const resultText = document.querySelector("#result");

const manualOption = document.querySelector("#form__manual");
const peopleEnter = document.querySelector("#form__people");
const occupancyOptions = document.querySelectorAll(
  'input[name="occupancy-use"]',
);

function updateManualPeopleState() {
  const selectedOccupancy = document.querySelector(
    'input[name="occupancy-use"]:checked',
  );

  const length = document.querySelector("#length");
  const width = document.querySelector("#width");

  const manualSelected = selectedOccupancy === manualOption;
  peopleEnter.disabled = !manualSelected;
  length.disabled = manualSelected;
  width.disabled = manualSelected;

  length.placeholder = manualSelected ? "Not required." : "";
  width.placeholder = manualSelected ? "Not required." : "";

  peopleEnter.required = manualSelected;

  if (!manualSelected) {
    peopleEnter.value = "";
  }
}

occupancyOptions.forEach((option) => {
  option.addEventListener("change", updateManualPeopleState);
});

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
  const exitFootageAmt = Number(exitFootage.value);
  const exitDischargeFactor = Number(selectedExitDischarge.value);

  let occupantLoad;

  if (selectedOccupancy === manualOption) {
    occupantLoad = Number(peopleEnter.value);
  } else {
    const occupancyFactor = Number(selectedOccupancy.value);
    occupantLoad = (lengthAmt * widthAmt) / occupancyFactor;
  }

  console.log(occupantLoad);

  let box2 = exitFootageAmt * exitDischargeFactor;

  let result = (occupantLoad / box2) * 100;

  resultText.textContent = `Occupancy readiness: ${result.toFixed(2)}%`;
});
