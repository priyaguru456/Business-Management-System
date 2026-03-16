export default function ProductTable({ products }) {

  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p._id}>

            <td>{p.name}</td>

            <td>{p.price}</td>

            <td>{p.category}</td>

            <td>{p.stock}</td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}