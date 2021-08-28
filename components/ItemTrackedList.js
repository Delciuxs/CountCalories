export default function ItemTrackedList({
  itemsTracked,
  clearTrackedItems,
  deleteTrackedItem,
}) {
  return (
    <>
      <p className="mt-4">Food you have eaten: </p>
      <table className="table mt-5 is-striped is-narrow is-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>S (g)</th>
            <th>F (g)</th>
            <th>P (g)</th>
            <th>C (g)</th>
            <th>Cal (kcal)</th>
          </tr>
        </thead>
        <tbody>
          {itemsTracked.map((trackedItem, index) => (
            <tr key={index}>
              <td className="is-vcentered">
                <button
                  className="delete is-small"
                  onClick={() => deleteTrackedItem(index)}
                ></button>
              </td>
              <th>{trackedItem.name}</th>
              <td>{trackedItem.serving}</td>
              <td>{(trackedItem.fat).toFixed(2)}</td>
              <td>{(trackedItem.protein).toFixed(2)}</td>
              <td>{(trackedItem.carbs).toFixed(2)}</td>
              <td>{(trackedItem.cal).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="button is-info is-widescreen"
        onClick={() => clearTrackedItems()}
      >
        Start New Day
      </button>
    </>
  );
}
