import { useNavigate } from "react-router-dom";

export default function PaymentMethods(){

const navigate = useNavigate()

return(

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

.nav-links span{
cursor:pointer;
}

.layout{
display:flex;
}

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
}

.sidebar p{
margin:10px 0;
cursor:pointer;
color:#444;
padding:10px 12px;
border-radius:6px;
transition:all 0.2s;
}

.sidebar p:hover{
background:#2874f0;
color:white;
transform:translateX(5px);
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
margin-bottom:20px;
}

input{
width:100%;
padding:10px;
margin:8px 0;
border:1px solid #ccc;
border-radius:6px;
}

button{
padding:10px 15px;
background:#2874f0;
border:none;
color:white;
border-radius:6px;
cursor:pointer;
}

`}</style>

{/* NAVBAR */}

<div className="navbar">

<div className="logo" onClick={()=>navigate("/user")}>
FlipShop
</div>

<div className="nav-links">
<span onClick={()=>navigate("/user")}>Home</span>
<span onClick={()=>navigate("/cart")}>Cart 🛒</span>
<span onClick={()=>navigate("/wishlist")}>Wishlist ❤️</span>
<span onClick={()=>navigate("/my-orders")}>Orders 📦</span>
</div>

</div>

{/* LAYOUT */}

<div className="layout">

{/* SIDEBAR */}

<div className="sidebar">

<h3>⚙️ Settings</h3>

<p onClick={()=>navigate("/profile")}>👤 Profile</p>

<p onClick={()=>navigate("/password-security")}>
🔒 Password & Security
</p>

<p onClick={()=>navigate("/address")}>
📍 Address
</p>

<p onClick={()=>navigate("/notifications")}>
🔔 Notifications
</p>

<p onClick={()=>navigate("/payments")}>
💳 Payment Methods
</p>

</div>

{/* CONTENT */}

<div className="content">

<h2>Payment Methods 💳</h2>

<div className="card">

<h3>Add New Card</h3>

<input type="text" placeholder="Card Holder Name"/>

<input type="text" placeholder="Card Number"/>

<input type="text" placeholder="Expiry Date"/>

<input type="text" placeholder="CVV"/>

<button>Add Card</button>

</div>

<div className="card">

<h3>Saved Cards</h3>

<p>No cards saved yet.</p>

</div>

</div>

</div>

</div>

)

}