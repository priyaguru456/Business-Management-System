import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [profilePic, setProfilePic] = useState("https://i.pravatar.cc/40");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <style>{`
        .navbar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          background:white;
          padding:15px 25px;
          border-radius:10px;
          box-shadow:0 4px 12px rgba(0,0,0,0.08);
          margin-bottom:20px;
        }

        .nav-left{
          display:flex;
          align-items:center;
          gap:15px;
        }

        .logo{
          font-size:20px;
          font-weight:bold;
          color:#2874f0;
          letter-spacing:1px;
        }

        .search{
          padding:8px 12px;
          border:1px solid #ddd;
          border-radius:6px;
          width:220px;
          outline:none;
        }

        .search:focus{
          border-color:#2874f0;
        }

        .nav-right{
          display:flex;
          align-items:center;
          gap:15px;
          position:relative;
        }

        .profile-box{
          display:flex;
          align-items:center;
          gap:8px;
          background:#f5f7fb;
          padding:6px 12px;
          border-radius:20px;
          cursor:pointer;
          position:relative;
        }

        .admin-avatar{
          width:36px;
          height:36px;
          border-radius:50%;
          object-fit:cover;
          border:2px solid #2874f0;
        }

        .admin-name{
          font-weight:600;
          color:#444;
          font-size:14px;
        }

        .logout-btn{
          background:#2874f0;
          color:white;
          border:none;
          padding:8px 16px;
          border-radius:6px;
          cursor:pointer;
          font-weight:bold;
          transition:0.3s;
        }

        .logout-btn:hover{
          background:#1f5ed6;
          transform:scale(1.05);
        }

        /* Dropdown */
        .profile-dropdown{
          position:absolute;
          top:50px;
          right:0;
          background:white;
          box-shadow:0 8px 20px rgba(0,0,0,0.1);
          border-radius:10px;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          width:160px;
          z-index:10;
        }

        .profile-dropdown button,
        .profile-dropdown label{
          padding:10px 15px;
          border:none;
          background:none;
          text-align:left;
          cursor:pointer;
          font-size:14px;
          transition:0.2s;
        }

        .profile-dropdown button:hover,
        .profile-dropdown label:hover{
          background:#f0f0f0;
        }

        input[type="file"]{
          display:none;
        }

        @media(max-width:768px){
          .search{ display:none; }
          .logo{ font-size:18px; }
        }
      `}</style>

      <div className="navbar">
        {/* LEFT */}
        <div className="nav-left">
          <div className="logo">BMS Dashboard</div>
          <input className="search" type="text" placeholder="Search..." />
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          <div
            className="profile-box"
            onClick={() => setShowSettings(!showSettings)}
          >
            <img src={profilePic} alt="Admin" className="admin-avatar" />
            
          </div>

          {showSettings && (
            <div className="profile-dropdown">
              <label htmlFor="profilePicUpload">Change Picture</label>
              <input
                type="file"
                id="profilePicUpload"
                onChange={handleProfilePicChange}
              />
              <button onClick={() => alert("Profile Settings")}>Profile</button>
              <button onClick={() => alert("Account Settings")}>Account</button>
              <button onClick={() => alert("Other Settings")}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}