import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Profile() {

const navigate = useNavigate();

const [cart,setCart] = useState([]);
const [wishlist,setWishlist] = useState([]);
const [search,setSearch] = useState("");
const [showProfile,setShowProfile] = useState(false);

useEffect(()=>{

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const wishItems = JSON.parse(localStorage.getItem("wishlist")) || [];

setCart(cartItems);
setWishlist(wishItems);

},[]);

const styles = {

container:{
padding:"40px",
flex:1,
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f6f7fb"
},

card:{
background:"white",
padding:"35px",
width:"420px",
borderRadius:"12px",
boxShadow:"0 10px 30px rgba(0,0,0,0.1)",
textAlign:"center"
},

avatar:{
width:"90px",
height:"90px",
borderRadius:"50%",
background:"#4f46e5",
color:"white",
display:"flex",
alignItems:"center",
justifyContent:"center",
fontSize:"32px",
fontWeight:"bold",
margin:"0 auto 15px"
},

title:{
fontSize:"26px",
marginBottom:"20px",
fontWeight:"600"
},

info:{
fontSize:"16px",
marginBottom:"10px",
color:"#333"
},

buttonContainer:{
marginTop:"25px",
display:"flex",
justifyContent:"center",
gap:"15px"
},

orderBtn:{
padding:"10px 18px",
background:"#4f46e5",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
},

wishlistBtn:{
padding:"10px 18px",
background:"#ff4d6d",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
}

};

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
position:sticky;
top:0;
z-index:100;
}

.logo{
font-size:22px;
font-weight:bold;
cursor:pointer;
}

.search{
padding:7px;
border:none;
border-radius:4px;
width:260px;
}

.nav-links{
display:flex;
gap:20px;
align-items:center;
}

.nav-links span{
cursor:pointer;
font-weight:500;
}

.profile-menu{
position:absolute;
top:55px;
right:30px;
background:white;
color:black;
width:170px;
box-shadow:0 4px 15px rgba(0,0,0,0.2);
border-radius:6px;
}

.profile-menu p{
padding:10px;
margin:0;
cursor:pointer;
}

.profile-menu p:hover{
background:#f1f1f1;
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
margin-bottom:20px;
color:#2874f0;
font-size:20px;
}

.sidebar p{
margin:12px 0;
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

`}</style>


{/* NAVBAR */}

<div className="navbar">

<div className="logo" onClick={()=>navigate("/")}>
FlipShop
</div>

<input
className="search"
placeholder="Search products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<div className="nav-links">

<span onClick={()=>navigate("/")}>Home</span>

<span onClick={()=>navigate("/cart")}>
Cart ({cart.length}) 🛒
</span>

<span onClick={()=>navigate("/wishlist")}>
Wishlist ({wishlist.length}) ❤️
</span>

<span onClick={()=>navigate("/my-orders")}>
Orders 📦
</span>

<span onClick={()=>setShowProfile(!showProfile)}>
Profile 👤
</span>

</div>

{showProfile &&(

<div className="profile-menu">

<p onClick={()=>navigate("/profile")}>My Profile</p>
<p onClick={()=>navigate("/my-orders")}>Orders</p>
<p onClick={()=>navigate("/wishlist")}>Wishlist</p>
<p>Logout</p>

</div>

)}

</div>


<div className="layout">


{/* SIDEBAR (SETTINGS SIDEBAR) */}

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


{/* PROFILE */}

<div style={styles.container}>

<div style={styles.card}>

<div style={styles.avatar}>P</div>

<h2 style={styles.title}>My Profile 👤</h2>

<p style={styles.info}>
<b>Name:</b> Priya Guru
</p>

<p style={styles.info}>
<b>Email:</b> user@email.com
</p>

<p style={styles.info}>
<b>Role:</b> Customer
</p>

<div style={styles.buttonContainer}>

<button
style={styles.orderBtn}
onClick={()=>navigate("/my-orders")}
>
My Orders 📦
</button>

<button
style={styles.wishlistBtn}
onClick={()=>navigate("/wishlist")}
>
Wishlist ❤️
</button>

</div>

</div>

</div>

</div>

</div>

);

}