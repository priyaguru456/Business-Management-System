import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [activeFooterInfo, setActiveFooterInfo] = useState(null);

  const footerInfoData = {
    "Dashboard":"View your business dashboard with sales & analytics.",
    "Analytics":"Check revenue trends, charts, and performance metrics.",
    "Product Management":"Add, edit, or organize your products easily.",
    "Reports":"Generate business and sales reports instantly.",
    "About":"Learn about our company, mission, and values.",
    "Careers":"Explore current openings and join our team.",
    "Blog":"Read articles and insights about business management.",
    "Contact":"Contact us at contact@bms.com or +91 1234567890",
    "Help Center":"Call 1800-HELP or visit our nearest support center.",
    "Privacy Policy":"Read our privacy and data protection policies.",
    "Terms":"Check our terms and conditions for using BMS.",
    "Support":"Email support@bms.com or call 1800-123-456 for help."
  };

  const handleFooterClick = (link) => {
    setActiveFooterInfo(footerInfoData[link]);
    setTimeout(() => setActiveFooterInfo(null), 5000); // hide after 5s
  };

  return (
    <>
      <style>{`
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Arial, Helvetica, sans-serif;
}

/* NAVBAR */
.home-navbar{
  position:sticky;
  top:0;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:18px 60px;
  background:#ffffff;
  box-shadow:0 4px 15px rgba(0,0,0,0.08);
  z-index:100;
}

.home-logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  color: #6c4df6;
  gap: 8px;
}

.logo-icon {
  font-size: 32px; /* bigger icon */
  animation: rotateLogo 4s linear infinite; /* subtle animation */
}

@keyframes rotateLogo {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
}

.logo-text {
  letter-spacing: 2px;
}

.home-links{
  display:flex;
  gap:20px;
}

.home-links a{
  text-decoration:none;
  color:#333;
  font-weight:600;
  padding:8px 16px;
  border-radius:6px;
  transition:0.3s;
}

.home-links a:hover{
  background:#6c4df6;
  color:white;
}

/* HERO */
.hero{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:100px 80px;
  background:linear-gradient(135deg,#1f1c2c,#928dab);
  color:white;
}

.hero-title{
  font-size:48px;
  font-weight:bold;
  margin-bottom:20px;
}

.hero-desc{
  font-size:18px;
  line-height:1.6;
  margin-bottom:35px;
  max-width:520px;
}

.hero-buttons{
  display:flex;
  gap:20px;
}

.primary-btn{
  background:white;
  color:#333;
  padding:14px 28px;
  border-radius:8px;
  font-weight:bold;
  text-decoration:none;
  transition:0.3s;
}

.primary-btn:hover{
  transform:translateY(-3px);
}

.secondary-btn{
  border:2px solid white;
  color:white;
  padding:14px 28px;
  border-radius:8px;
  text-decoration:none;
  font-weight:bold;
}

.hero-img img{
  width:420px;
}

/* STATS */
.stats{
  display:flex;
  justify-content:center;
  gap:80px;
  padding:60px;
  background:#fafafa;
  text-align:center;
}

.stat h2{
  font-size:36px;
  color:#6c4df6;
}

.stat p{
  color:#666;
}

/* FEATURES */
.features{
  padding:80px;
  text-align:center;
  background:#f3f4ff;
}

.features h2{
  font-size:34px;
  margin-bottom:50px;
}

.feature-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:30px;
}

.feature-card{
  background:white;
  padding:30px;
  border-radius:12px;
  box-shadow:0 10px 25px rgba(0,0,0,0.08);
  transition:0.3s;
}

.feature-card:hover{
  transform:translateY(-8px);
}

.feature-icon{
  font-size:36px;
  margin-bottom:15px;
}

/* TESTIMONIALS */
.testimonials{
  padding:80px;
  background:#fff7f0;
  text-align:center;
}

.testimonials h2{
  margin-bottom:40px;
}

.testimonial-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:30px;
}

.testimonial{
  background:white;
  padding:25px;
  border-radius:10px;
  box-shadow:0 6px 15px rgba(0,0,0,0.08);
}

.testimonial p{
  color:#555;
  margin-bottom:10px;
}

/* CTA */
.cta{
  text-align:center;
  padding:90px;
  background:#1f1c2c;
  color:white;
}

.cta h2{
  font-size:36px;
  margin-bottom:20px;
}

.cta-btn{
  display:inline-block;
  margin-top:20px;
  background:#ffb347;
  color:black;
  padding:14px 28px;
  border-radius:8px;
  text-decoration:none;
  font-weight:bold;
}

/* FOOTER */
.footer{
  background:#111;
  color:#ddd;
  padding:60px 80px 20px;
  position:relative;
}

.footer-container{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  gap:40px;
  margin-bottom:30px;
}

.footer-logo{
  font-size:22px;
  font-weight:bold;
  color:white;
  margin-bottom:10px;
}

.footer-desc{
  font-size:14px;
  color:#aaa;
  line-height:1.6;
}

.footer-title{
  font-size:16px;
  font-weight:bold;
  margin-bottom:15px;
  color:white;
}

.footer-links{
  display:flex;
  flex-direction:column;
  gap:8px;
}

.footer-links a{
  text-decoration:none;
  color:#aaa;
  font-size:14px;
  cursor:pointer;
  transition:0.3s;
}

.footer-links a:hover{
  color:white;
}

.footer-social{
  display:flex;
  gap:12px;
  margin-top:10px;
}

.social-icon{
  width:35px;
  height:35px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#222;
  border-radius:50%;
  cursor:pointer;
  transition:0.3s;
}

.social-icon:hover{
  background:#ffb347;
  color:black;
}

.footer-bottom{
  border-top:1px solid #333;
  padding-top:15px;
  text-align:center;
  font-size:14px;
  color:#aaa;
}

/* Footer popup */
.footer-popup{
  position:absolute;
  bottom:80px;
  left:50%;
  transform:translateX(-50%);
  background:#6c4df6;
  color:white;
  padding:15px 25px;
  border-radius:8px;
  font-weight:bold;
  box-shadow:0 4px 15px rgba(0,0,0,0.2);
  max-width:350px;
  text-align:center;
  z-index:100;
  animation:fadeIn 0.9s;
}

@keyframes fadeIn{
  from{opacity:0; transform:translateX(-50%) translateY(10px);}
  to{opacity:1; transform:translateX(-50%) translateY(0);}
}
      `}</style>

      <div className="home-navbar">
  {/* Logo with icon */}
  <div className="home-logo">
    <span className="logo-icon">📊</span>
    <span className="logo-text">BMS</span>
  </div>

  {/* Links */}
  <div className="home-links">
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>
</div>


      {/* HERO */}
      <div className="hero">
        <div>
          <div className="hero-title">Smart Business Management</div>
          <div className="hero-desc">
            Control products, analytics and business operations from one
            powerful dashboard built for modern companies.
          </div>
          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">Get Started</Link>
            <Link to="/register" className="secondary-btn">Create Account</Link>
          </div>
        </div>

        <div className="hero-img">
          <img src="https://illustrations.popsy.co/gray/web-design.svg" />
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat"><h2>10K+</h2><p>Businesses</p></div>
        <div className="stat"><h2>50K+</h2><p>Users</p></div>
        <div className="stat"><h2>1M+</h2><p>Products Managed</p></div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <h2>Powerful Features</h2>
        <div className="feature-grid">
          <div className="feature-card"><div className="feature-icon">📊</div><h3>Analytics Dashboard</h3><p>Track revenue and sales using powerful charts.</p></div>
          <div className="feature-card"><div className="feature-icon">📦</div><h3>Product Management</h3><p>Easily add, edit and organize products.</p></div>
          <div className="feature-card"><div className="feature-icon">👥</div><h3>User Roles</h3><p>Admin and user dashboards with secure access.</p></div>
          <div className="feature-card"><div className="feature-icon">⚡</div><h3>Fast System</h3><p>Built with modern technologies for speed.</p></div>
          <div className="feature-card"><div className="feature-icon">📝</div><h3>Reports & Exports</h3><p>Generate business reports and export data easily.</p></div>
          <div className="feature-card"><div className="feature-icon">🔒</div><h3>Secure Login</h3><p>Protect your system with authentication and secure access.</p></div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonials">
        <h2>What Users Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial"><p>"This dashboard helped us manage products easily."</p><b>Startup Founder</b></div>
          <div className="testimonial"><p>"Simple UI and powerful analytics."</p><b>Business Owner</b></div>
          <div className="testimonial"><p>"Best management system for small businesses."</p><b>Product Manager</b></div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta">
        <h2>Start Managing Your Business Today</h2>
        <Link to="/register" className="cta-btn">Create Free Account</Link>
      </div>

      {/* FOOTER */}
      <div className="footer">
        <div className="footer-container">
          {/* BRAND */}
          <div>
            <div className="footer-logo">BMS</div>
            <div className="footer-desc">
              Powerful Business Management System to manage products, analytics,
              and operations in one modern dashboard.
            </div>
            <div className="footer-social">
              <div className="social-icon">🌐</div>
              <div className="social-icon">🐦</div>
              <div className="social-icon">💼</div>
              <div className="social-icon">📘</div>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <div className="footer-title">Product</div>
            <div className="footer-links">
              {["Dashboard","Analytics","Product Management","Reports"].map(link => (
                <a key={link} onClick={() => handleFooterClick(link)}>{link}</a>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <div className="footer-title">Company</div>
            <div className="footer-links">
              {["About","Careers","Blog","Contact"].map(link => (
                <a key={link} onClick={() => handleFooterClick(link)}>{link}</a>
              ))}
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <div className="footer-title">Support</div>
            <div className="footer-links">
              {["Help Center","Privacy Policy","Terms","Support"].map(link => (
                <a key={link} onClick={() => handleFooterClick(link)}>{link}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Popup */}
        {activeFooterInfo && <div className="footer-popup">{activeFooterInfo}</div>}

        <div className="footer-bottom">
          © 2026 Business Management System • All Rights Reserved
        </div>
      </div>
    </>
  );
}