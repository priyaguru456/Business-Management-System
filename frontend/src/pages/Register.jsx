import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

export default function Register(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async (e)=>{
    e.preventDefault()
    try{
      await API.post("/auth/register",{name,email,password})
      alert("Registration successful")
      navigate("/login")
    }catch(err){
      alert(err.response?.data?.message || "Register failed")
    }
  }

  return(
    <div className="register-page">
      <style>{`
        /* Page Layout */
        .register-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(135deg, #6a5acd, #d3d3d3); /* purple-gray gradient */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Navbar */
        .register-navbar {
          width: 100%;
          padding: 15px 40px;
          background: rgba(255,255,255,0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 22px;
          color: #6a5acd;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        /* Footer */
        .register-footer {
          width: 100%;
          padding: 15px 40px;
          background: rgba(255,255,255,0.9);
          text-align: center;
          color: #6a5acd;
          font-weight: bold;
          box-shadow: 0 -4px 15px rgba(0,0,0,0.1);
        }

        /* Center Content */
        .auth-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .auth-container h2 {
          color: white;
          font-size: 36px;
          margin-bottom: 15px;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.3);
        }

        .auth-container p.subtitle {
          color: #f0e6ff;
          font-size: 18px;
          margin-bottom: 25px;
          text-align: center;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          background: rgba(255,255,255,0.95);
          padding: 30px 40px;
          border-radius: 15px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
          min-width: 320px;
        }

        input {
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
          outline: none;
          transition: 0.3s;
        }

        input:focus {
          border-color: #6a5acd;
          box-shadow: 0 0 10px rgba(106,90,205,0.4);
        }

        button {
          padding: 12px 15px;
          border-radius: 8px;
          border: none;
          background: #6a5acd;
          color: white;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        button:hover {
          background: #5842a3;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        p {
          margin-top: 20px;
          color: #fff;
          font-size: 14px;
        }

        p a {
          color: #fff;
          font-weight: bold;
          text-decoration: underline;
        }

        @media(max-width:480px){
          form {
            padding: 20px;
            width: 90%;
          }
        }
      `}</style>

      {/* Navbar */}
      <div className="register-navbar">
        Business Management System
      </div>

      {/* Main Content */}
      <div className="auth-container">
        <h2>Join Us!</h2>
        <p className="subtitle">Create an account to start managing your business efficiently</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>

        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* Footer */}
      <div className="register-footer">
        © 2026 Business Management System. All rights reserved.
      </div>
    </div>
  )
}