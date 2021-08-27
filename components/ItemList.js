export default function ItemList({ items, deleteItem }) {
  return (
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
        {items.map((item, index) => (
          <tr key={index}>
            <td className="is-vcentered">
              <button
                className="delete is-small"
                onClick={() => deleteItem(index)}
              ></button>
            </td>
            <th>{item.name}</th>
            <td>{item.serving}</td>
            <td>{item.fat}</td>
            <td>{item.protein}</td>
            <td>{item.carbs}</td>
            <td>{item.cal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
