import { useRef, useState } from "react";

export default function MacrosDataForm({
  details,
  updateDetails,
  setShowBasicDataForm,
  setShowSpecificDataForm,
  setShowMacrosDataForm,
  setShowOverView,
}) {
  const selectFatRef = useRef();
  const selectProteinRef = useRef();

  const goBackToSpecificInfo = () => {
    setShowBasicDataForm(false);
    setShowSpecificDataForm(true);
    setShowMacrosDataForm(false);
    setShowOverView(false);0
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const goalCalories = parseFloat(details.goalCalories);

    let fatCalPercentage = parseFloat(selectFatRef.current.value);
    let proteinPerWeight = parseFloat(selectProteinRef.current.value);

    let fatCal = Math.round(goalCalories * fatCalPercentage);
    let fatG = Math.round(fatCal / 9);

    let proteinG = Math.round(proteinPerWeight * details.weight);
    let proteinCal = Math.round(proteinG * 4);

    let carbsCal = goalCalories - fatCal - proteinCal;
    let carbsG = Math.round(carbsCal / 4);

    console.log("Fat :", fatG);
    console.log("Protein :", proteinG);
    console.log("Carbs :", carbsG);

    updateDetails({
      ...details,
      macrosDefined: true,
      fatG: fatG,
      proteinG: proteinG,
      carbsG: carbsG,
      fatGEaten: 0,
      proteinGEaten: 0,
      carbsGEaten: 0,
    })

    setShowMacrosDataForm(false);
    setShowOverView(true);

  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field is-expanded">
            <label className="label">Fat (% of the total calories)</label>
            <div className="control has-icons-left">
              <div className="select is-fullwidth is-info">
                <select name="fat" ref={selectFatRef} defaultValue={0.30}>
                  <option value={0.15}>15%</option>
                  <option value={0.20}>20%</option>
                  <option value={0.25}>25%</option>
                  <option value={0.30}>30%</option>
                  <option value={0.35}>35%</option>
                  <option value={0.40}>40%</option>
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-pizza-slice"></i>
              </div>
            </div>
          </div>
          <div className="field is-expanded">
            <label className="label">Protein (g per body weight kg)</label>
            <div className="control has-icons-left">
              <div className="select is-fullwidth is-info">
                <select
                  name="protein"
                  ref={selectProteinRef}
                  defaultValue={1.9}
                >
                  <option value={1.6}>1.6g</option>
                  <option value={1.7}>1.7g</option>
                  <option value={1.8}>1.8g</option>
                  <option value={1.9}>1.9g</option>
                  <option value={2.0}>2.0g</option>
                  <option value={2.1}>2.1g</option>
                  <option value={2.2}>2.2g</option>
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-fish"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        <strong>Note: </strong>Carbohydrates will be the remainder of the
        calories.
      </p>
      <div className="field is-grouped is-grouped-centered mt-5">
        <div className="control">
          <button
            onClick={goBackToSpecificInfo}
            className="button is-link is-light"
          >
            ← Define your Goal
          </button>
        </div>
        <div className="control">
          <button type="submit" className="button is-link">
            → Set your Macros
          </button>
        </div>
      </div>
    </form>
  );
}
