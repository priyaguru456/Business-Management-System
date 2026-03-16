import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div>
      <style>{`

body{
margin:0;
font-family:Arial;
background:#f1f3f6;
}

/* NAVBAR */

.navbar{
background:#2874f0;
color:white;
padding:12px 30px;
display:flex;
justify-content:space-between;
align-items:center;
}

.logo{
font-size:22px;
font-weight:bold;
cursor:pointer;
}

.nav-links{
display:flex;
gap:20px;
}

.nav-links span{
cursor:pointer;
}

/* LAYOUT */

.layout{
display:flex;
}

/* SIDEBAR */

/* SIDEBAR */

.sidebar{
width:240px;
background:linear-gradient(180deg,#ffffff,#f7f9fc);
padding:25px 20px;
min-height:100vh;
box-shadow:3px 0 12px rgba(0,0,0,0.08);
border-right:1px solid #eee;
}

.sidebar h3{
margin-bottom:25px;
color:#2874f0;
font-size:20px;
font-weight:bold;
}

.sidebar p{
margin:10px 0;
cursor:pointer;
color:#444;
padding:10px 14px;
border-radius:6px;
font-weight:500;
transition:all 0.25s ease;
display:flex;
align-items:center;
gap:10px;
}

.sidebar p:hover{
background:#2874f0;
color:white;
transform:translateX(6px);
box-shadow:0 4px 10px rgba(0,0,0,0.1);
}

/* CONTENT */

.content{
flex:1;
padding:30px;
}

.settings-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
gap:20px;
}

.card{
background:white;
padding:20px;
border-radius:10px;
box-shadow:0 4px 15px rgba(0,0,0,0.08);
transition:0.3s;
}

.card:hover{
transform:translateY(-5px);
box-shadow:0 8px 25px rgba(0,0,0,0.12);
}

.card h4{
margin-bottom:10px;
}

.card p{
color:#555;
font-size:14px;
margin-bottom:15px;
}

button{
padding:8px 14px;
border:none;
background:#2874f0;
color:white;
border-radius:6px;
cursor:pointer;
}

`}</style>

      {/* NAVBAR */}

      <div className="navbar">
        <div className="logo" onClick={() => navigate("/user")}>
          FlipShop
        </div>

        <div className="nav-links">
          <span onClick={() => navigate("/user")}>Home</span>
          <span onClick={() => navigate("/cart")}>Cart 🛒</span>
          <span onClick={() => navigate("/wishlist")}>Wishlist ❤️</span>
          <span onClick={() => navigate("/my-orders")}>Orders 📦</span>
        </div>
      </div>

      {/* LAYOUT */}

      <div className="layout">
        {/* SIDEBAR */}

        <div className="sidebar">
  <h3>⚙️ Settings</h3>

  <p onClick={() => navigate("/profile")}>
    👤 Profile
  </p>

  <p onClick={() => navigate("/password-security")}>
    🔒 Password & Security
  </p>

  <p onClick={() => navigate("/address")}>
    📍 Address
  </p>

  <p onClick={() => navigate("/notifications")}>
    🔔 Notifications
  </p>

  <p onClick={() => navigate("/payments")}>
    💳 Payment Methods
  </p>
</div>

        {/* CONTENT */}

        <div className="content">
          <h2>Account Settings</h2>

          <div className="settings-grid">
            <div className="card">
              <h4>👤 Profile Information</h4>
              <p>Update your name, email and personal details.</p>
              <button>Edit Profile</button>
            </div>

            <div className="card">
              <h4>🔒 Change Password</h4>
              <p>Update your password to keep your account secure.</p>
              <button>Change Password</button>
            </div>

            <div className="card">
              <h4>📍 Manage Address</h4>
              <p>Add or update delivery addresses.</p>
              <button>Manage Address</button>
            </div>

            <div className="card">
              <h4>🔔 Notifications</h4>
              <p>Control email and order notifications.</p>
              <button>Update</button>
            </div>

            <div className="card">
              <h4>💳 Payment Methods</h4>
              <p>Manage your saved cards and payment options.</p>
              <button>Manage</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
