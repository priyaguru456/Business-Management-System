import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api"; // axios instance

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed": return "#2ecc71";
      case "pending": return "#f1c40f";
      case "shipped": return "#3498db";
      case "cancelled": return "#e74c3c";
      default: return "#7f8c8d";
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <h1>Orders</h1>

        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.customerName}</td>
                <td>{o.customerEmail}</td>
                <td>{o.productName}</td>
                <td>{o.quantity}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(o.status) }}
                  >
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <style>{`
          .main {
            flex: 1;
            padding: 25px;
            background: #f0f3f8;
            min-height: 100vh;
            font-family: 'Segoe UI', sans-serif;
          }
          h1 {
            color: #2874f0;
            margin-bottom: 20px;
          }
          .orders-table {
            width: 100%;
            border-collapse: collapse;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            background: white;
          }
          .orders-table th,
          .orders-table td {
            padding: 14px 18px;
            text-align: left;
          }
          .orders-table th {
            background: #2874f0;
            color: white;
            text-transform: uppercase;
            font-size: 14px;
          }
          .orders-table tr:nth-child(even) {
            background: #f7f9fc;
          }
          .orders-table tr:hover {
            background: #e1f0ff;
            transform: scale(1.01);
            transition: 0.2s;
          }
          .status-badge {
            padding: 5px 12px;
            color: white;
            border-radius: 12px;
            font-weight: 600;
            font-size: 13px;
            display: inline-block;
          }

          @media(max-width:768px){
            .orders-table, .orders-table thead, .orders-table tbody, .orders-table th, .orders-table td, .orders-table tr {
              display:block;
            }
            .orders-table th{ display:none; }
            .orders-table tr {
              margin-bottom: 15px;
              background:white;
              box-shadow:0 5px 15px rgba(0,0,0,0.06);
              border-radius:8px;
              padding:10px;
            }
            .orders-table td {
              display:flex;
              justify-content:space-between;
              padding:8px 10px;
            }
            .orders-table td::before{
              content: attr(data-label);
              font-weight:bold;
              color:#555;
            }
          }
        `}</style>
      </div>
    </div>
  );
}