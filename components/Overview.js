export default function Overview({
  details,
  setShowBasicDataForm,
  setShowSpecificDataForm,
  setShowMacrosDataForm,
  setShowOverView,
}) {
  const goBackToSetMacros = () => {
    setShowBasicDataForm(false);
    setShowSpecificDataForm(false);
    setShowMacrosDataForm(true);
    setShowOverView(false);
  };

  return (
    <>
      <div className="box">
        <h1 className="title is-4">Macros</h1>
        <p>Consume these grams of each group to achieve your goal weight</p>
        <div className="columns is-centered">
          <div className="column is-narrow">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th>Macro</th>
                  <th>Goal</th>
                  <th>Remainding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Fat </th>
                  <td>
                    <strong className="has-text-danger">
                      {details.fatG} g
                    </strong>
                  </td>
                  <td>
                    <span className="has-text-danger">
                      {parseFloat(details.fatG) - parseFloat(details.fatGEaten)}{" "}
                      g
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Protein </th>
                  <td>
                    <strong className="has-text-success">
                      {details.proteinG} g
                    </strong>
                  </td>
                  <td>
                    <span className="has-text-success">
                      {parseFloat(details.proteinG) -
                        parseFloat(details.proteinGEaten)}{" "}
                      g
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>Carbs </th>
                  <td>
                    <strong className="has-text-link">
                      {details.carbsG} g
                    </strong>
                  </td>
                  <td>
                    <span className="has-text-link">
                      {parseFloat(details.carbsG) -
                        parseFloat(details.carbsGEaten)}{" "}
                      g
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button onClick={goBackToSetMacros} className="button is-link">
        ← Set Macros
      </button>
    </>
  );
}
