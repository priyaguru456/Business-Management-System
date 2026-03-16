import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get("/products/" + id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: "40px" }}>Loading product...</h2>;
  }

  const discount = 20;
  const originalPrice = product.price + 1000;

  return (
    <div
      style={{
        padding: "50px",
        background: "#f1f3f6",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 16px",
          border: "none",
          background: "#222",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ⬅ Back
      </button>

      <div
        style={{
          display: "flex",
          gap: "50px",
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Product Image */}
        <div>
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt="product"
            style={{
              width: "350px",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ maxWidth: "500px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
            {product.name}
          </h1>

          <p style={{ color: "#555", marginBottom: "20px" }}>
            {product.description}
          </p>

          {/* Price Section */}
          <div style={{ marginBottom: "20px" }}>
            <span
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#000",
                marginRight: "15px",
              }}
            >
              ₹ {product.price}
            </span>

            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginRight: "10px",
              }}
            >
              ₹ {originalPrice}
            </span>

            <span style={{ color: "green", fontWeight: "bold" }}>
              {discount}% OFF
            </span>
          </div>

          {/* Offers */}
          <div style={{ marginBottom: "20px" }}>
            <h3>Available Offers</h3>

            <p>💳 Bank Offer: 10% instant discount on Credit Cards</p>

            <p>🔥 Special Price: Extra ₹200 off</p>

            <p>🚚 Free Delivery</p>

            <p>📦 Delivery by Tomorrow</p>
          </div>

          {/* Buy Button */}
          <button
            onClick={() => navigate("/checkout")}
            style={{
              padding: "12px 30px",
              border: "none",
              background: "#fb641b",
              color: "white",
              fontSize: "16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Buy Now 💳
          </button>
        </div>
      </div>
    </div>
  );
}