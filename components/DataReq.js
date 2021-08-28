import BasicDataForm from "./BasicDataForm";
import SpecificDataForm from "./SpecificDataForm";
import MacrosDataForm from "./MacrosDataForm";
import Overview from "./Overview";
import { useState, useEffect } from "react";

export default function DataReq({ details, setDetails }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showBasicDataForm, setShowBasicDataForm] = useState(false);
  const [showSpecificDataForm, setShowSpecificDataForm] = useState(false);
  const [showMacrosDataForm, setShowMacrosDataForm] = useState(false);
  const [showOverview, setShowOverView] = useState(false);
  // const [details, setDetails] = useState(null);

  useEffect(() => {
    const detailsStr = localStorage.getItem("details");
    if (detailsStr && detailsStr.length > 0) {
      const details = JSON.parse(detailsStr);
      setDetails(details);
      if (
        details.maintenanceCalories === undefined ||
        details.maintenanceCalories === ""
      ) {
        setShowBasicDataForm(true);
        setShowSpecificDataForm(false);
        setShowMacrosDataForm(false);
        setShowOverView(false);
      } else if (
        details.goalCalories === undefined ||
        details.goalCalories === ""
      ) {
        setShowBasicDataForm(false);
        setShowSpecificDataForm(true);
        setShowMacrosDataForm(false);
        setShowOverView(false);
      } else if (
        details.macrosDefined === undefined ||
        details.macrosDefined === ""
      ) {
        setShowBasicDataForm(false);
        setShowSpecificDataForm(false);
        setShowMacrosDataForm(true);
        setShowOverView(false);
      } else {
        setShowBasicDataForm(false);
        setShowSpecificDataForm(false);
        setShowMacrosDataForm(false);
        setShowOverView(true);
      }
    } else {
      setShowBasicDataForm(true);
    }
  }, []);

  const updateDetails = (details) => {
    setDetails(details);
    updateLocalStorageDetails(details);
  };

  const updateLocalStorageDetails = (details) => {
    localStorage.setItem("details", JSON.stringify(details));
  };

  return (
    <>
      {showBasicDataForm && (
        <>
          <h1 className="title is-3 ">Welcome!</h1>
          <p>
            I see is you first time here, please provide information to help
            with your calories goals.
            <span className="has-text-info" onClick={() => setShowInfo(true)}>
              <i className="fas fa-info-circle"></i>
            </span>
          </p>

          {showInfo && (
            <div class="notification is-info is-light">
              <button
                class="delete"
                onClick={() => setShowInfo(false)}
              ></button>
              This app is using the <strong>Mifflin St. Jeor Equation</strong>{" "}
              for weight management.
            </div>
          )}

          <section className="container is-fluid mt-4">
            <BasicDataForm
              setShowBasicDataForm={setShowBasicDataForm}
              setShowSpecificDataForm={setShowSpecificDataForm}
              updateDetails={updateDetails}
              details={details}
            />
          </section>
        </>
      )}
      {showSpecificDataForm && (
        <>
          <h1 className="title is-3 ">
            Maintenance Calories :{" "}
            <span className="title is-1 has-text-info">
              {details.maintenanceCalories} kcal
            </span>
          </h1>
          <span>
            These are the calories you need to maintain your current weight.
          </span>
          <section className="container is-fluid mt-5">
            <SpecificDataForm
              details={details}
              updateDetails={updateDetails}
              setShowBasicDataForm={setShowBasicDataForm}
              setShowSpecificDataForm={setShowSpecificDataForm}
              setShowMacrosDataForm={setShowMacrosDataForm}
            />
          </section>
        </>
      )}
      {showMacrosDataForm && (
        <>
          <h1 className="title is-3 ">
            Goal Calories :{" "}
            <span className="title is-1 has-text-info">
              {details.goalCalories} kcal
            </span>
          </h1>
          <span>Consume these calories daily to achieve you goal weight.</span>
          <section className="container is-fluid mt-5">
            <MacrosDataForm
              details={details}
              updateDetails={updateDetails}
              setShowBasicDataForm={setShowBasicDataForm}
              setShowSpecificDataForm={setShowSpecificDataForm}
              setShowMacrosDataForm={setShowMacrosDataForm}
              setShowOverView={setShowOverView}
            />
          </section>
        </>
      )}
      {showOverview && (
        <>
          <h1 className="title is-3 ">
            Goal Calories :{" "}
            <span className="title is-1 has-text-info">
              {details.goalCalories} kcal
            </span>
          </h1>
          <p>Consume these calories daily to achieve you goal weight.</p>
          <p className="mt-3">
            <strong>Goal:</strong>{" "}
            {details.difCalories > 0 ? "Gain Weight" : "Lose Weight"}
          </p>
          <p>
            <strong>Calories Remainding: </strong>
            <span className="has-text-info">
              {(parseFloat(details.fatG) - parseFloat(details.fatGEaten)) * 9 +
                (parseFloat(details.proteinG) -
                  parseFloat(details.proteinGEaten)) *
                  4 +
                (parseFloat(details.carbsG) - parseFloat(details.carbsGEaten)) *
                  4}
            </span>
          </p>

          <section className="container is-fluid mt-5">
            <Overview
              setShowOverView={setShowOverView}
              details={details}
              setShowBasicDataForm={setShowBasicDataForm}
              setShowSpecificDataForm={setShowSpecificDataForm}
              setShowMacrosDataForm={setShowMacrosDataForm}
              setShowOverView={setShowOverView}
            />
          </section>
        </>
      )}
    </>
  );
}
