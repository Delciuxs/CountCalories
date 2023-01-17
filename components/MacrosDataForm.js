import { useRef, useState, useReducer } from "react";

const ACTIONS = {
  CHECK_INPUT_VALUES: "check_input_values",
};

function preventNonNumericalInput(e) {
  e = e || window.event;
  var charCode = typeof e.which == "undefined" ? e.keyCode : e.which;
  var charStr = String.fromCharCode(charCode);

  if (!charStr.match(/^[0-9]+$/)) e.preventDefault();
}

const reducer = (stateForm, action) => {
  switch (action.type) {
    case ACTIONS.CHECK_INPUT_VALUES:
      return {
        inputCustomProteinG: action.payload.inputCustomProteinG,
      };
    default:
      return stateForm;
  }
};

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
  const inputCustomProteinGRef = useRef();
  const [isManualProteinChecked, setIsManualProteinChecked] = useState(false);

  const [formInputs, dispatchFormInputs] = useReducer(reducer, {
    inputCustomProteinG: "is-info",
  });

  const goBackToSpecificInfo = () => {
    setShowBasicDataForm(false);
    setShowSpecificDataForm(true);
    setShowMacrosDataForm(false);
    setShowOverView(false);0
  };

  const setManualProtein = () => {
    setIsManualProteinChecked(lastState => !lastState);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const goalCalories = parseFloat(details.goalCalories);
    let fatG, proteinG, carbsG;
    fatG = proteinG = carbsG = 0;

    if(isManualProteinChecked){
      const customProteinG = inputCustomProteinGRef.current.value;
      const customProteinCal = customProteinG * 4;
      if (customProteinG === "" || customProteinCal > goalCalories) {
        dispatchFormInputs({
          type: ACTIONS.CHECK_INPUT_VALUES,
          payload: {
            inputCustomProteinG:
            customProteinG !== "" ? "is-success" : "is-danger",
          },
        });
        return;
      }
      proteinG = customProteinG;
      const remaindingCal = goalCalories - customProteinCal;
      let fatCalPercentage = parseFloat(selectFatRef.current.value);
      let fatCal = Math.round(remaindingCal * fatCalPercentage);
      fatG = Math.round(fatCal / 9);
      let carbsCal = remaindingCal - fatCal;
      carbsG = Math.round(carbsCal / 4);

    }else{
      let fatCalPercentage = parseFloat(selectFatRef.current.value);
      let proteinPerWeight = parseFloat(selectProteinRef.current.value);

      let fatCal = Math.round(goalCalories * fatCalPercentage);
      fatG = Math.round(fatCal / 9);

      proteinG = Math.round(proteinPerWeight * details.weight);
      let proteinCal = Math.round(proteinG * 4);

      let carbsCal = goalCalories - fatCal - proteinCal;
      carbsG = Math.round(carbsCal / 4);
    }

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
      <label class="checkbox">
        <input type="checkbox" checked={isManualProteinChecked} onChange={setManualProtein}/>
        {` Define g of protein manually`}
      </label>
      <div className="field is-horizontal">
        <div className="field-body">
          {isManualProteinChecked ? (
            <div className="field is-expanded">
              <div className="field">
                <label className="label">Protein (define g manually)</label>
                <div className="control has-icons-left">
                  <input
                    ref={inputCustomProteinGRef}
                    className={`input ${formInputs.inputCustomProteinG}`}
                    type="number"
                    placeholder="Enter your custom g of protein"
                    pattern="[0-9]*"
                    onKeyPress={(e) => preventNonNumericalInput(e)}
                    name="custom-g-protein"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-fish"></i>
                  </span>
                </div>
        </div>
            </div>
            ) : (
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
            )
          }
          <div className="field is-expanded">
            <label className="label">{`Fat (% of the ${isManualProteinChecked ? "remainding" : "total"} calories)`}</label>
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
