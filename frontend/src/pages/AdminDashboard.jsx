import { useEffect, useState } from "react";
import API from "../api/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import SalesChart from "../charts/SalesChart";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="layout">
      <style>{`

.layout{
  display:flex;
  background: linear-gradient(120deg, #eef2f7, #d9e6f2);
  min-height:100vh;
  font-family:Arial, Helvetica, sans-serif;
}

/* Main Section */
.main{
  flex:1;
  padding:25px;
}

/* Dashboard Title */
.dashboard-title{
  font-size:26px;
  font-weight:bold;
  margin-top:10px;
  color:#1b3a57;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* Cards */
.cards{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
  gap:25px;
  margin-top:25px;
}

.card{
  background: linear-gradient(145deg, #ffffff, #f0f6ff);
  padding:22px;
  border-radius:12px;
  box-shadow:0 12px 25px rgba(0,0,0,0.08);
  transition:0.3s;
  border-left:5px solid #2874f0;
  color:#333;
}

.card:hover{
  transform:translateY(-6px);
  box-shadow:0 15px 30px rgba(0,0,0,0.15);
}

/* Chart Section */
.chart-section{
  margin-top:40px;
  background: linear-gradient(145deg, #ffffff, #f0f6ff);
  padding:25px;
  border-radius:12px;
  box-shadow:0 12px 25px rgba(0,0,0,0.08);
}

.chart-section h2{
  margin-bottom:20px;
  color:#1b3a57;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}

/* Quick Stats */
.quick-stats{
  margin-top:40px;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:20px;
}

.stat-box{
  background: linear-gradient(145deg, #ffffff, #f0f6ff);
  padding:25px;
  border-radius:12px;
  box-shadow:0 12px 25px rgba(0,0,0,0.08);
  transition:0.3s;
  text-align:center;
  color:#333;
}

.stat-box:hover{
  transform:translateY(-5px);
  box-shadow:0 15px 30px rgba(0,0,0,0.15);
}

.stat-box h3{
  margin-bottom:10px;
  color:#1b3a57;
  font-size:16px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.08);
}

.stat-number{
  font-size:32px;
  font-weight:bold;
  color:#2874f0;
}

/* Responsive */
@media(max-width:768px){
  .main{
    padding:15px;
  }

  .dashboard-title{
    font-size:22px;
  }
}

      `}</style>

      <Sidebar />

      <div className="main">
        <Navbar />

        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="cards">
          <DashboardCard title="Revenue" value="$12000" />
          <DashboardCard title="Orders" value="320" />
          <DashboardCard title="Customers" value="80" />
          <DashboardCard title="Products" value={products.length} />
        </div>

        {/* Chart */}
        <div className="chart-section">
          <h2>Sales Analytics</h2>
          <SalesChart />
        </div>

        {/* Extra Stats */}
        <div className="quick-stats">
          <div className="stat-box">
            <h3>Total Products</h3>
            <div className="stat-number">{products.length}</div>
          </div>

          <div className="stat-box">
            <h3>Active Users</h3>
            <div className="stat-number">120</div>
          </div>

          <div className="stat-box">
            <h3>Pending Orders</h3>
            <div className="stat-number">24</div>
          </div>
        </div>

      </div>
    </div>
  );
}