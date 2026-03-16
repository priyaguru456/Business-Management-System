import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <style>{`
        .sidebar {
          width: 230px;
          height: 100vh;
          background: linear-gradient(180deg, #2874f0, #1b4fb8);
          color: white;
          padding: 25px 20px;
          position: sticky;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar h3 {
          margin-bottom: 20px;
          font-size: 22px;
          letter-spacing: 1px;
          border-bottom: 1px solid rgba(255,255,255,0.3);
          padding-bottom: 10px;
        }

        .sidebar a {
          text-decoration: none;
          color: white;
          padding: 10px 12px;
          border-radius: 6px;
          transition: 0.3s;
          font-size: 15px;
        }

        .sidebar a:hover {
          background: rgba(255,255,255,0.2);
          transform: translateX(5px);
        }
      `}</style>

      <div className="sidebar">
        <h3>Admin Panel Flip Shop</h3>
        <Link to="/admin">Dashboard</Link>
        <Link to="/products">Products</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/users">Users</Link>
        <Link to="/orders">Orders</Link>
      </div>
    </>
  );
}