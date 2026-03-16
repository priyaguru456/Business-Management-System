import { useEffect, useState } from "react";
import API from "../api/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await API.put(`/products/${editId}`, { name, price, category });
        alert("✅ Product Updated Successfully");
        setEditId(null);
      } else {
        await API.post("/products", { name, price, category });
        alert("✅ Product Added Successfully");
      }

      setName("");
      setPrice("");
      setCategory("");

      getProducts();
    } catch (error) {
      alert("❌ Something went wrong");
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("🗑 Product Deleted Successfully");
      getProducts();
    } catch (error) {
      alert("❌ Delete Failed");
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setCategory(product.category);
    setEditId(product._id);

    alert("✏️ Editing Product");
  };

  return (
    <div className="layout">
      <style>{`

.layout{
display:flex;
background:#f4f6f9;
min-height:100vh;
font-family:Arial;
}

.main{
flex:1;
padding:30px;
}

.page-title{
margin-bottom:20px;
}

.form{
display:flex;
gap:10px;
margin-bottom:20px;
}

input,select{
padding:10px;
border:1px solid #ccc;
border-radius:6px;
}

button{
padding:10px 15px;
border:none;
border-radius:6px;
cursor:pointer;
font-weight:bold;
}

.add-btn{
background:#2874f0;
color:white;
}

.edit-btn{
background:#ff9f00;
color:white;
margin-left:10px;
}

.delete-btn{
background:#e53935;
color:white;
margin-left:10px;
}

table{
width:100%;
background:white;
border-collapse:collapse;
box-shadow:0 4px 10px rgba(0,0,0,0.08);
border-radius:10px;
overflow:hidden;
}

th,td{
padding:12px;
border-bottom:1px solid #eee;
text-align:left;
}

th{
background:#2874f0;
color:white;
}

tr:hover{
background:#f5f5f5;
}

`}</style>

      <Sidebar />

      <div className="main">
        <Navbar />

        <h2 className="page-title">Product Management</h2>

        {/* FORM */}

        <div className="form">
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
          </select>

          <button className="add-btn" onClick={handleSubmit}>
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>

        {/* TABLE */}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>

                <td>₹ {p.price}</td>

                <td>{p.category}</td>

                <td>
                  <button className="edit-btn" onClick={() => editProduct(p)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}