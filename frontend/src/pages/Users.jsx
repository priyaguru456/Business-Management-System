import { useEffect, useState } from "react";
import API from "../api/api"; // axios instance with baseURL
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add or Update user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      if (editingId) return handleUpdateUser();

      const res = await API.post("/users", newUser);
      setUsers([...users, res.data]);
      setNewUser({ name: "", email: "", password: "", role: "user" });

      setMessage("User added successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to add user");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      setUsers(users.filter(u => u._id !== id));

      setMessage("User deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Failed to delete user");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingId(user._id);
    setNewUser({ name: user.name, email: user.email, password: "", role: user.role });
  };

  // Update user
  const handleUpdateUser = async () => {
    try {
      const res = await API.put(`/users/${editingId}`, {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
      setUsers(users.map(u => (u._id === editingId ? res.data : u)));
      setEditingId(null);
      setNewUser({ name: "", email: "", password: "", role: "user" });

      setMessage("User updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to update user");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Users</h1>

        {message && (
          <div style={{ marginBottom: "15px", padding: "10px 15px", background: "#d4edda", color: "#155724", borderRadius: "8px", border: "1px solid #c3e6cb" }}>
            {message}
          </div>
        )}

        {/* Add/Edit Form */}
        <form className="add-form" onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          {!editingId && (
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              required
            />
          )}
          <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value.toLowerCase() })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">{editingId ? "Update User" : "Add User"}</button>
        </form>

        {/* Users Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>

              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u._id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.password ? "********" : ""}</td>
                <td>{u.role}</td>
                <td>
                  <button className="edit-btn action-btn" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="delete-btn action-btn" onClick={() => handleDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          <style>{`
          .main { flex:1; padding:25px; background:#f0f3f8; min-height:100vh; font-family: 'Segoe UI', sans-serif; }
          h1 { color:#2874f0; margin-bottom:20px; }
          .add-form { background:white; padding:20px; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.08); margin-bottom:25px; display:flex; gap:15px; flex-wrap:wrap; align-items:flex-end; }
          .add-form input, .add-form select { padding:8px 12px; border:1px solid #ddd; border-radius:6px; flex:1; min-width:150px; }
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