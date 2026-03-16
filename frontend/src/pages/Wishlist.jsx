import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    setWishlist(wish);
    setCart(cartItems);
  }, []);

  const removeItem = (index) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);

    setWishlist(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const filteredWishlist = wishlist.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

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
position:sticky;
top:0;
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

.content{
flex:1;
padding:40px;
}

.product-card{
background:white;
padding:20px;
border-radius:12px;
box-shadow:0 6px 20px rgba(0,0,0,0.08);
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:20px;
}

.product-info{
display:flex;
gap:15px;
align-items:center;
}

.product-info img{
width:100px;
height:100px;
object-fit:cover;
border-radius:8px;
}

.btn{
border:none;
padding:10px 15px;
border-radius:8px;
cursor:pointer;
margin-left:10px;
}

.cart-btn{
background:#fb641b;
color:white;
}

.remove-btn{
background:#ff4d6d;
color:white;
}

`}</style>

      {/* NAVBAR */}

      <div className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          FlipShop
        </div>

        <input
          className="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>

          <span onClick={() => navigate("/cart")}>Cart ({cart.length}) 🛒</span>

          <span onClick={() => navigate("/wishlist")}>
            Wishlist ({wishlist.length}) ❤️
          </span>

          <span onClick={() => navigate("/my-orders")}>Orders 📦</span>

          <span onClick={() => setShowProfile(!showProfile)}>Profile 👤</span>
        </div>

        {showProfile && (
          <div className="profile-menu">
            <p onClick={() => navigate("/profile")}>My Profile</p>

            <p onClick={() => navigate("/my-orders")}>Orders</p>

            <p onClick={() => navigate("/wishlist")}>Wishlist</p>

            <p>Logout</p>
          </div>
        )}
      </div>

      <div className="layout">
        {/* SIDEBAR */}

        <div className="sidebar">
          <h3>Categories</h3>

          <p onClick={() => navigate("/user")}>All</p>

          <p onClick={() => setSelectedCategory("Electronics")}>📱 Electronics</p>

          <p onClick={() => setSelectedCategory("Fashion")}>👕 Fashion</p>

          <p onClick={() => setSelectedCategory("Books")}>📚 Books</p>

          <p onClick={() => setSelectedCategory("Home")}>🏠 Home</p>
        </div>

        {/* WISHLIST PRODUCTS */}

        <div className="content">
          <h2>Your Wishlist ❤️</h2>

          {filteredWishlist.length === 0 ? (
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
                color: "#555",
              }}
            >
              No products in wishlist
            </div>
          ) : (
            filteredWishlist.map((item, index) => (
              <div className="product-card" key={index}>
                <div className="product-info">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                  />

                  <div>
                    <h4>{item.name}</h4>

                    <p>Category: {item.category}</p>

                    <p style={{ color: "green", fontWeight: "bold" }}>
                      ₹ {item.price}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    className="btn cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn remove-btn"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
