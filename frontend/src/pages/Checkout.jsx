

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Checkout(){

const location = useLocation();
const navigate = useNavigate();

const productFromDetails = location.state?.product || null;

const [cartProducts,setCartProducts] = useState([]);
const [paymentMethod,setPaymentMethod] = useState("");
const [cart,setCart] = useState([]);
const [wishlist,setWishlist] = useState([]);
const [search,setSearch] = useState("");
const [showProfile,setShowProfile] = useState(false);

useEffect(()=>{

if(productFromDetails){
setCartProducts([productFromDetails]);
}else{
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
setCartProducts(savedCart);
}

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const wishItems = JSON.parse(localStorage.getItem("wishlist")) || [];

setCart(cartItems);
setWishlist(wishItems);

},[productFromDetails]);

const subtotal = cartProducts.reduce((sum,p)=> sum + p.price*(p.qty || 1),0);

const delivery = 50;

const total = subtotal + delivery;

const placeOrder = ()=>{

if(!paymentMethod){
alert("Select payment method");
return;
}

const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const newOrder = {
_id: Date.now().toString(),
products: cartProducts,
total: total,
status: "Processing",
date: new Date().toLocaleString()
};

localStorage.setItem("orders",JSON.stringify([...savedOrders,newOrder]));

localStorage.setItem("cart",JSON.stringify([]));

alert("Order Placed Successfully 🎉");

navigate("/my-orders");

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

{/* SIDEBAR */}

<div className="sidebar">

<h3>Categories</h3>

<p onClick={()=>navigate("/user")}>All</p>
<p onClick={()=>navigate("/user?category=electronics")}>📱 Electronics</p>
<p onClick={()=>navigate("/user?category=fashion")}>👕 Fashion</p>
<p onClick={()=>navigate("/user?category=books")}>📚 Books</p>
<p onClick={()=>navigate("/user?category=home")}>🏠 Home</p>

</div>


{/* CHECKOUT */}

<div style={{padding:"40px",flex:1}}>

<h2>Checkout</h2>

<div style={{display:"flex",gap:"40px",flexWrap:"wrap"}}>

<div style={{flex:1,minWidth:"300px"}}>

<input placeholder="Full Name" style={inputStyle}/>
<input placeholder="Phone" style={inputStyle}/>
<input placeholder="Address" style={inputStyle}/>

<select
style={inputStyle}
value={paymentMethod}
onChange={(e)=>setPaymentMethod(e.target.value)}
>

<option value="">Select Payment</option>
<option value="Cash on Delivery">Cash on Delivery</option>
<option value="UPI">UPI</option>
<option value="Card">Card</option>

</select>

<button onClick={placeOrder} style={btnStyle}>
Place Order
</button>

</div>


<div style={summaryStyle}>

<h3>Order Summary</h3>

{cartProducts.map((p,i)=>(

<div key={i} style={rowStyle}>
<span>{p.name} x {p.qty || 1}</span>
<span>₹ {p.price*(p.qty||1)}</span>
</div>

))}

<hr/>

<div style={rowStyle}>
<span>Subtotal</span>
<span>₹ {subtotal}</span>
</div>

<div style={rowStyle}>
<span>Delivery</span>
<span>₹ {delivery}</span>
</div>

<div style={{...rowStyle,fontWeight:"bold"}}>
<span>Total</span>
<span>₹ {total}</span>
</div>

</div>

</div>

</div>

</div>

</div>

);

}

const inputStyle={
display:"block",
width:"100%",
padding:"10px",
marginBottom:"15px",
border:"1px solid #ccc",
borderRadius:"6px"
};

const btnStyle={
padding:"12px",
background:"#fb641b",
color:"white",
border:"none",
borderRadius:"6px",
cursor:"pointer"
};

const summaryStyle={
width:"300px",
background:"white",
padding:"20px",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
};

const rowStyle={
display:"flex",
justifyContent:"space-between",
marginBottom:"10px"
};