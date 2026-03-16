import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Customers from "./pages/Customers";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Settings from "./pages/Settings";
import PasswordSecurity from "./pages/PasswordSecurity";
import Address from "./pages/Address";
import Notifications from "./pages/Notifications";
import PaymentMethods from "./pages/PaymentMethods";



import Products from "./pages/Products";
import CategoryProducts from "./pages/CategoryProducts";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/users" element={<Users />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/password-security" element={<PasswordSecurity/>}/>
<Route path="/address" element={<Address/>}/>
<Route path="/notifications" element={<Notifications/>}/>
<Route path="/payments" element={<PaymentMethods/>}/>
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/products" element={<Products />} />
      <Route path="/category/:name" element={<CategoryProducts />} />
    </Routes>
  );
}