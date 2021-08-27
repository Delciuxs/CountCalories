import { useRef, useReducer } from "react";

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
        inputWeight: action.payload.inputWeight,
        inputHeight: action.payload.inputHeight,
        inputAge: action.payload.inputAge,
      };
    default:
      return stateForm;
  }
};

export default function BasicDataForm({
  setShowSpecificDataForm,
  setShowBasicDataForm,
  updateDetails,
  details,
}) {

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const weight = inputWeightRef.current.value;
    const height = inputHeightRef.current.value;
    const age = inputAgeRef.current.value;
    const gender = selectGenderRef.current.value;
    const activity = selectActivityRef.current.value;
    let maintenanceCalories = 0;

    if (weight !== "" && height !== "" && age !== "") {
      maintenanceCalories =
        10 * parseInt(weight, 10) +
        6.25 * parseInt(height, 10) -
        5 * parseInt(age, 10);

      gender === "male"
        ? (maintenanceCalories += 5)
        : (maintenanceCalories -= 161);

      maintenanceCalories *= parseFloat(activity);
      maintenanceCalories = parseInt(maintenanceCalories + 1, 10);
      setShowBasicDataForm(false);
      setShowSpecificDataForm(true);
      updateDetails({
        weight: weight,
        height: height,
        age: age,
        gender: gender,
        activity: activity,
        maintenanceCalories: maintenanceCalories,
      });
    } else {
      dispatchFormInputs({
        type: ACTIONS.CHECK_INPUT_VALUES,
        payload: {
          inputWeight: weight !== "" ? "is-success" : "is-danger",
          inputHeight: height !== "" ? "is-success" : "is-danger",
          inputAge: age !== "" ? "is-success" : "is-danger",
        },
      });
    }
  };

  const inputWeightRef = useRef();
  const inputHeightRef = useRef();
  const inputAgeRef = useRef();
  const selectGenderRef = useRef();
  const selectActivityRef = useRef();

  const [formInputs, dispatchFormInputs] = useReducer(reducer, {
    inputWeight: "is-info",
    inputHeight: "is-info",
    inputAge: "is-info",
  });

  return (
    <form onSubmit={handleSubmitForm}>
      <div className="field">
        <label className="label">Weight</label>
        <div className="control has-icons-left">
          <input
            ref={inputWeightRef}
            className={`input ${formInputs.inputWeight}`}
            type="number"
            placeholder="Enter your weight in kg"
            pattern="[0-9]*"
            onKeyPress={(e) => preventNonNumericalInput(e)}
            name="weight"
            defaultValue={details?.weight ?? ""}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-balance-scale"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Height</label>
        <div className="control has-icons-left">
          <input
            ref={inputHeightRef}
            className={`input ${formInputs.inputHeight}`}
            type="number"
            placeholder="Enter your height in cm"
            pattern="[0-9]*"
            onKeyPress={(e) => preventNonNumericalInput(e)}
            name="height"
            defaultValue={details?.height ?? ""}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-ruler-vertical"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Age</label>
        <div className="control has-icons-left">
          <input
            ref={inputAgeRef}
            className={`input ${formInputs.inputAge}`}
            type="number"
            placeholder="Enter your age in years"
            pattern="[0-9]*"
            onKeyPress={(e) => preventNonNumericalInput(e)}
            name="age"
            defaultValue={details?.age ?? ""}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-heart"></i>
          </span>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field is-expanded">
            <label className="label">Gender</label>
            <div className="control has-icons-left">
              <div className="select is-fullwidth is-info">
                <select
                  name="gender"
                  ref={selectGenderRef}
                  defaultValue={details?.gender ?? "male"}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-venus-mars"></i>
              </div>
            </div>
          </div>
          <div className="field is-expanded">
            <label className="label">Activity</label>
            <div className="control has-icons-left">
              <div className="select is-fullwidth is-info">
                <select
                  name="activity"
                  ref={selectActivityRef}
                  defaultValue={details?.activity ?? 1.55}
                >
                  <option value={1.2}>
                    Sedentary (Little to no exercise )
                  </option>
                  <option value={1.375}>
                    Light exercise (1-3 days per week)
                  </option>
                  <option value={1.55}>
                    Moderate exercise (3-5 days per week)
                  </option>
                  <option value={1.725}>
                    Heavy exercise (6-7 days per week)
                  </option>
                  <option value={1.9}>
                    Very heavy exercise (twice per day)
                  </option>
                </select>
              </div>
              <div className="icon is-small is-left">
                <i className="fas fa-dumbbell"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control mt-5">
          <button type="submit" className="button is-link is-fullwidth">
            → Define your goal
          </button>
        </div>
      </div>
    </form>
  );
}
