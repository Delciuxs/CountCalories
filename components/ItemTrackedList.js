export default function ItemTrackedList({ itemsTracked, clearTrackedItems }) {
  return (
    <>
      <button className="button is-info is-widescreen" onClick={() => clearTrackedItems()}>Clear Tracked Items</button>
      <p className="mt-4">Food you have eaten: </p>
      <table className="table mt-5 is-striped is-narrow is-bordered">
        <thead>
          <tr>
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
              <th>{trackedItem.name}</th>
              <td>{trackedItem.serving}</td>
              <td>{trackedItem.fat}</td>
              <td>{trackedItem.protein}</td>
              <td>{trackedItem.carbs}</td>
              <td>{trackedItem.cal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
