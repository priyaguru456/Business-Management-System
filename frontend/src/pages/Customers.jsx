import { useEffect, useState } from "react";
import API from "../api/api"; // axios instance with baseURL
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState(""); // <-- added message state

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Add new customer
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      if (editingId) return handleUpdateCustomer(); // if editing, update
      const res = await API.post("/customers", newCustomer);
      setCustomers([...customers, res.data]);
      setNewCustomer({ name: "", email: "", phone: "" });

      // Show success message
      setMessage("Customer added successfully!");
      setTimeout(() => setMessage(""), 3000); // disappear after 3 seconds
    } catch (err) {
      console.error(err);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;
    try {
      await API.delete(`/customers/${id}`);
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Edit customer
  const handleEdit = (customer) => {
    setEditingId(customer._id);
    setNewCustomer({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  // Update customer
  const handleUpdateCustomer = async () => {
    try {
      const res = await API.put(`/customers/${editingId}`, newCustomer);
      setCustomers(customers.map((c) => (c._id === editingId ? res.data : c)));
      setEditingId(null);
      setNewCustomer({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Customers</h1>

        {/* Success message */}
        {message && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px 15px",
              background: "#d4edda",
              color: "#155724",
              borderRadius: "8px",
              border: "1px solid #c3e6cb",
            }}
          >
            {message}
          </div>
        )}

        {/* Add/Edit Form */}
        <form className="add-form" onSubmit={handleAddCustomer}>
          <input
            type="text"
            placeholder="Name"
            value={newCustomer.name}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, phone: e.target.value })
            }
          />
          <button type="submit">
            {editingId ? "Update Customer" : "Add Customer"}
          </button>
        </form>

        {/* Customers Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.orders?.length || 0}</td>
                <td>
                  <button
                    className="edit-btn action-btn"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn action-btn"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* CSS remains unchanged */}
        <style>{`
          .main { flex:1; padding:25px; background:#f0f3f8; min-height:100vh; font-family: 'Segoe UI', sans-serif; }
          h1 { color:#2874f0; margin-bottom:20px; }
          .add-form { background:white; padding:20px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.08); margin-bottom:25px; display:flex; gap:15px; flex-wrap:wrap; align-items:flex-end; }
          .add-form input { padding:8px 12px; border:1px solid #ddd; border-radius:6px; flex:1; min-width:150px; }
          .add-form button { background:#2874f0; color:white; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:600; transition:0.3s; }
          .add-form button:hover { background:#1f5ed6; }
          table { width:100%; border-collapse: collapse; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08); background:white; }
          th, td { padding:14px 18px; text-align:left; }
          th { background:#2874f0; color:white; text-transform: uppercase; font-size:14px; }
          tr:nth-child(even){ background:#f7f9fc; }
          tr:hover { background:#e1f0ff; }
          .action-btn { padding:6px 12px; border:none; border-radius:6px; cursor:pointer; margin-right:6px; font-size:13px; font-weight:500; }
          .edit-btn { background:#3498db; color:white; }
          .edit-btn:hover { background:#217dbb; }
          .delete-btn { background:#e74c3c; color:white; }
          .delete-btn:hover { background:#c0392b; }
          @media(max-width:768px){
            table, thead, tbody, th, td, tr { display:block; }
            th{ display:none; }
            tr{ margin-bottom:15px; background:white; box-shadow:0 5px 15px rgba(0,0,0,0.06); border-radius:8px; padding:10px; }
            td{ display:flex; justify-content:space-between; padding:8px 10px; }
            td::before{ content: attr(data-label); font-weight:bold; color:#555; }
          }
        `}</style>
      </div>
    </div>
  );
}
