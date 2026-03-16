import { useNavigate } from "react-router-dom";

export default function Address() {

const navigate = useNavigate()

return (
<div>

<style>{`

body{
margin:0;
font-family:Arial;
background:#f1f3f6;
}

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

.layout{
display:flex;
}

.sidebar{
width:240px;
background:white;
padding:25px;
min-height:100vh;
border-right:1px solid #eee;
}

.sidebar p{
margin:10px 0;
cursor:pointer;
}

.content{
flex:1;
padding:40px;
}

.card{
background:white;
padding:25px;
border-radius:10px;
box-shadow:0 4px 15px rgba(0,0,0,0.08);
max-width:500px;
}

`}</style>


<div className="navbar">
<div className="logo" onClick={()=>navigate("/user")}>FlipShop</div>

<div className="nav-links">
<span onClick={()=>navigate("/user")}>Home</span>
<span onClick={()=>navigate("/cart")}>Cart 🛒</span>
<span onClick={()=>navigate("/wishlist")}>Wishlist ❤️</span>
<span onClick={()=>navigate("/my-orders")}>Orders 📦</span>
</div>
</div>


<div className="layout">

<div className="sidebar">

<h3>⚙️ Settings</h3>

<p onClick={()=>navigate("/profile")}>👤 Profile</p>
<p onClick={()=>navigate("/password-security")}>🔒 Password</p>
<p onClick={()=>navigate("/address")}>📍 Address</p>
<p onClick={()=>navigate("/notifications")}>🔔 Notifications</p>
<p onClick={()=>navigate("/payments")}>💳 Payment Methods</p>

</div>


<div className="content">

<h2>Your Addresses</h2>

<div className="card">

<p>🏠 Home Address</p>
<p>123 Street, Kolkata</p>

<button>Add New Address</button>

</div>

</div>

</div>

</div>
)
}