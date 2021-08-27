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
        inputCustomCalories: action.payload.inputCustomCalories,
      };
    default:
      return stateForm;
  }
};

export default function SpecificDataForm({
  details,
  updateDetails,
  setShowBasicDataForm,
  setShowSpecificDataForm,
  setShowMacrosDataForm,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [manualGoal, setManualGoal] = useState(false);

  const selectGoalRef = useRef();
  const inputCustomCaloriesRef = useRef();

  const [formInputs, dispatchFormInputs] = useReducer(reducer, {
    inputCustomCalories: "is-info",
  });

  const goBackToBasicInfo = () =>{
    setShowBasicDataForm(true);
    setShowSpecificDataForm(false);
    setShowMacrosDataForm(false);
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    let difCalories = parseInt(selectGoalRef.current.value, 10);
    let goalCalories = details.maintenanceCalories;

    if (difCalories === 0) {
      const customCalories = inputCustomCaloriesRef.current.value;
      if (customCalories === "") {
        dispatchFormInputs({
          type: ACTIONS.CHECK_INPUT_VALUES,
          payload: {
            inputCustomCalories:
              customCalories !== "" ? "is-success" : "is-danger",
          },
        });
        return;
      }
      difCalories = parseInt(customCalories, 10);
    }

    goalCalories += difCalories;

    updateDetails({
      ...details,
      goalCalories: goalCalories,
      difCalories: difCalories,
    });
    setShowSpecificDataForm(false);
    setShowMacrosDataForm(true);
  };

  const handleOnChangeSelect = () => {
    selectGoalRef.current.value === "0"
      ? setManualGoal(true)
      : setManualGoal(false);
  };

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="field">
        <label className="label">
          Define your goal{" "}
          <span className="has-text-info" onClick={() => setShowInfo(true)}>
            <i className="fas fa-info-circle"></i>
          </span>
        </label>
        {showInfo && (
          <div className="notification is-info is-light">
            <button
              className="delete"
              onClick={() => setShowInfo(false)}
            ></button>
            <ul>
              <li>
                To <strong>lose weight</strong>, it is necessary to start
                consuming fewer calories than your maintenance{" "}
                <strong>(-200kcal on average)</strong>, so you will gradually
                begin to lose weight in a controlled way.
              </li>
              <li>
                To <strong>gain weight</strong>, it is necessary to start
                consuming more calories than your maintenance{" "}
                <strong>(+200kcal on average)</strong>, so you will gradually
                begin to gain weight in a controlled way.
              </li>
              <li className="mt-2">
                These calories (depending on the goal) must be updated over
                time, to continue losing or gaining weight in a controlled
                manner. With the above, it is expected that{" "}
                <strong>
                  in a month you will gain or lose one kg of weight
                </strong>
                , modify the calories when you feel that you are stagnant.
              </li>
            </ul>
          </div>
        )}
        <div className="control has-icons-left">
          <div className="select">
            <select
              name="goal"
              ref={selectGoalRef}
              onChange={handleOnChangeSelect}
            >
              <option value={-200}>Lose weight (-200 kcal)</option>
              <option value={200}>Gain weight (+200 kcal)</option>
              <option value={0}>Custom (define your calories)</option>
            </select>
          </div>
          <div className="icon is-small is-left">
            <i className="fas fa-flag-checkered"></i>
          </div>
        </div>
      </div>
      {manualGoal && (
        <div className="field">
          <label className="label">Define your calories</label>
          <div className="control has-icons-left">
            <input
              ref={inputCustomCaloriesRef}
              className={`input ${formInputs.inputCustomCalories}`}
              type="number"
              placeholder="Enter your custom kcal"
              pattern="[0-9]*"
              onKeyPress={(e) => preventNonNumericalInput(e)}
              name="custom-calories"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-hamburger"></i>
            </span>
          </div>
        </div>
      )}
      <div className="field is-grouped is-grouped-centered mt-5">
        <div className="control">
          <button onClick={goBackToBasicInfo} className="button is-link is-light">← Basic Info</button>
        </div>
        <div className="control">
          <button type="submit" className="button is-link">
            → Define your Macros
          </button>
        </div>
      </div>
    </form>
  );
}
