import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrders(){

const [orders,setOrders] = useState([]);
const [cart,setCart] = useState([]);
const [wishlist,setWishlist] = useState([]);
const [search,setSearch] = useState("");
const [showProfile,setShowProfile] = useState(false);

const navigate = useNavigate();

useEffect(()=>{

const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

setOrders(savedOrders);
setCart(savedCart);
setWishlist(savedWishlist);

},[]);

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

.sidebar h3{
color:#2874f0;
margin-bottom:20px;
}

.sidebar p{
cursor:pointer;
padding:10px;
border-radius:5px;
}

.sidebar p:hover{
background:#2874f0;
color:white;
}

.orders-container{
flex:1;
padding:40px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:white;
padding:20px;
border-radius:8px;
box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.top{
display:flex;
justify-content:space-between;
}

.status{
background:#e8f5e9;
padding:4px 10px;
border-radius:20px;
font-size:12px;
}

.btn{
margin-top:10px;
padding:10px;
background:#4f46e5;
color:white;
border:none;
border-radius:5px;
cursor:pointer;
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


{/* SIDEBAR */}

<div className="sidebar">

<h3>Categories</h3>

<p onClick={()=>navigate("/user")}>All </p>

<p onClick={()=>navigate("/user?category=electronics")}>
📱 Electronics
</p>

<p onClick={()=>navigate("/user?category=fashion")}>
👕 Fashion
</p>

<p onClick={()=>navigate("/user?category=books")}>
📚 Books
</p>

<p onClick={()=>navigate("/user?category=home")}>
🏠 Home
</p>

</div>


{/* ORDERS */}

<div className="orders-container">

<h2>My Orders 📦</h2>

{orders.length === 0 ?(

<p>No orders yet</p>

):( 

<div className="grid">

{orders.map(order=>(

<div key={order._id} className="card">

<div className="top">
<span>Order ID</span>
<span className="status">{order.status}</span>
</div>

<p>{order._id}</p>

<p>Total</p>

<h3>₹ {order.total}</h3>

<button
onClick={()=>navigate(`/order/${order._id}`)}
className="btn"
>
View Details
</button>

</div>

))}

</div>

)}

</div>

</div>

</div>

);

}