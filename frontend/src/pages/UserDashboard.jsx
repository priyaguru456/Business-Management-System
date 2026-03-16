import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function UserDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const getProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts();

    // load saved cart & wishlist
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  // FIXED CART FUNCTION
  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = [...existingCart, product];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);

    alert("Added to Cart 🛒");
  };

  // FIXED WISHLIST FUNCTION
  const addToWishlist = (product) => {
    const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const updatedWishlist = [...existingWishlist, product];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    setWishlist(updatedWishlist);

    alert("Added to Wishlist ❤️");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");

    alert("Logged out successfully 👋");

    navigate("/");
  };

  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory,
    )
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

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

.profile-menu p{
padding:10px 12px;
margin:0;
cursor:pointer;
display:flex;
align-items:center;
gap:8px;
border-radius:6px;
transition:all 0.25s ease;
}

.profile-menu p:hover{
background:#f1f5ff;
color:#2874f0;
transform:translateX(4px);
box-shadow:0 2px 6px rgba(0,0,0,0.08);
}
.layout{
display:flex;
}

.sidebar{
width:220px;
background:white;
padding:20px;
min-height:100vh;
box-shadow:2px 0 8px rgba(0,0,0,0.05);
}

.sidebar p{
margin:10px 0;
cursor:pointer;
color:#444;
}

.sidebar p:hover{
color:#2874f0;
font-weight:bold;
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
padding:30px;
}

.product-grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
gap:20px;
}

.card{
background:white;
padding:15px;
border-radius:8px;
box-shadow:0 2px 8px rgba(0,0,0,0.1);
text-align:center;
transition:0.3s;
}

.card:hover{
transform:translateY(-5px);
}

.card img{
width:100%;
height:160px;
object-fit:cover;
border-radius:6px;
}

.price{
color:#388e3c;
font-weight:bold;
margin:10px 0;
}

.rating{
color:#f39c12;
font-size:14px;
}

.buttons{
display:flex;
flex-direction:column;
gap:8px;
}

button{
padding:8px;
border:none;
border-radius:5px;
cursor:pointer;
}

.cart{
background:#ff9f00;
color:white;
}

.wish{
background:#ff4d6d;
color:white;
}

.buy{
background:#fb641b;
color:white;
}

`}</style>

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
            <p onClick={() => navigate("/profile")}>👤 My Profile</p>
            <p onClick={() => navigate("/my-orders")}>📦 Orders</p>
            <p onClick={() => navigate("/wishlist")}>❤️ Wishlist</p>
            <p onClick={() => navigate("/settings")}>⚙️ Settings</p>
            <p onClick={handleLogout}>🚪 Logout</p>
          </div>
        )}
      </div>

      <div className="layout">
        <div className="sidebar">
          <h3>Categories</h3>

          <p onClick={() => setSelectedCategory("All")}>All</p>
          <p onClick={() => setSelectedCategory("Electronics")}>
            📱 Electronics
          </p>
          <p onClick={() => setSelectedCategory("Fashion")}>👕 Fashion</p>
          <p onClick={() => setSelectedCategory("Books")}>📚 Books</p>
          <p onClick={() => setSelectedCategory("Home")}>🏠 Home</p>
        </div>

        <div className="content">
          <h2>{selectedCategory} Products</h2>

          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div className="card" key={p._id}>
                <img
                  src={p.image || "https://via.placeholder.com/200"}
                  alt="product"
                />

                <h4>{p.name}</h4>

                <p className="rating">
                  ⭐ {p.rating || 4} ({p.reviews || 0})
                </p>

                <p>{p.category}</p>

                <p className="price">₹ {p.price}</p>

                <div className="buttons">
                  <button className="cart" onClick={() => addToCart(p)}>
                    Add to Cart
                  </button>

                  <button className="wish" onClick={() => addToWishlist(p)}>
                    Wishlist
                  </button>

                  <button
                    className="buy"
                    onClick={() => navigate(`/product/${p._id}`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
