import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    const wish = JSON.parse(localStorage.getItem("wishlist")) || [];

    setCart(items);
    setWishlist(wish);
  }, []);

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const filteredCart = cart.filter((item) => {
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

.content{
flex:1;
padding:40px;
display:flex;
gap:30px;
}

.cart-items{
flex:2;
display:flex;
flex-direction:column;
gap:20px;
}

.summary{
flex:1;
background:white;
padding:25px;
border-radius:12px;
box-shadow:0 6px 20px rgba(0,0,0,0.08);
height:fit-content;
}

.summary h3{
margin-bottom:15px;
}

.row{
display:flex;
justify-content:space-between;
margin:10px 0;
}

.total{
font-weight:bold;
border-top:1px solid #ddd;
padding-top:10px;
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

          <p
            onClick={() => {
              setSelectedCategory("All");
              navigate("/user");
            }}
          >
            All
          </p>

          <p onClick={() => setSelectedCategory("Electronics")}>📱 Electronics</p>
          <p onClick={() => setSelectedCategory("Fashion")}>👕 Fashion</p>
          <p onClick={() => setSelectedCategory("Books")}>📚 Books</p>
          <p onClick={() => setSelectedCategory("Home")}>🏠 Home</p>
        </div>

        {/* CART CONTENT */}
        <div className="content">
          <div className="cart-items">
            <h2>Your Cart 🛒</h2>

            {filteredCart.length === 0 ? (
              <div
                style={{
                  background: "white",
                  padding: "40px",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  fontSize: "18px",
                  color: "#555",
                }}
              >
                No products in this category.
              </div>
            ) : (
              filteredCart.map((item, index) => (
                <div
                  key={index}
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />

                    <div>
                      <h4>{item.name}</h4>
                      <p>Category: {item.category}</p>
                      <p style={{ color: "#388e3c", fontWeight: "bold" }}>
                        ₹ {item.price}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      background: "#ff4d6d",
                      color: "white",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}

            {cart.length > 0 && (
              <button
                onClick={() => navigate("/checkout")}
                style={{
                  marginTop: "30px",
                  padding: "15px 25px",
                  background: "#fb641b",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Proceed to Checkout 💳
              </button>
            )}
          </div>

          {/* CART SUMMARY */}

          {cart.length > 0 && (
            <div className="summary">
              <h3>Cart Summary</h3>

              <div className="row">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="row">
                <span>Subtotal</span>
                <span>₹ {subtotal}</span>
              </div>

              <div className="row">
                <span>Delivery</span>
                <span style={{ color: "green" }}>Free</span>
              </div>

              <div className="row total">
                <span>Total</span>
                <span>₹ {subtotal}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
