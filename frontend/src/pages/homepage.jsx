import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pagescss/homepage.css";
import AdminPage from "./adminpage";
import Logo from "../components/Logo";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [credentials, setCredentials] = useState({ loginId: "", password: "", role: "employee" });
  const [signupData, setSignupData] = useState({
    role: "employee",
    name: "",  // This maps to fullName for admin, name for employee/hr
    username: "",
    password: "",
    email: "",
    mobile: "",
    gender: "",
    department: "",
  });
  const [errors, setErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/admins/")
      .then((res) => res.json())
      .then((data) => console.log("Admin data:", data))
      .catch((err) => console.error(err));
  }, []);

  // Input handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
    if (signupErrors[name]) setSignupErrors({ ...signupErrors, [name]: "" });
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!credentials.loginId.trim()) 
      newErrors.loginId = credentials.role === "admin" ? "Email is required" : "ID is required";
    if (!credentials.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignupForm = () => {
    const newErrors = {};
    if (!signupData.name.trim()) newErrors.name = "Name is required";
    if (!signupData.username.trim()) newErrors.username = "Username is required";
    if (!signupData.password) newErrors.password = "Password is required";
    if (!signupData.email.trim()) newErrors.email = "Email is required";
    setSignupErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    const loginPayload = {
      loginId: credentials.loginId,
      password: credentials.password
    };

    let url = "";
    if (credentials.role === "admin") {
      url = "/api/admins/login";
    } else if (credentials.role === "employee") {
      url = "/api/employees/login";
    } else if (credentials.role === "hr") {
      url = "/api/hr/login";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginPayload),
      });
      // Try to parse JSON if possible, otherwise fall back to text
      let data = {};
      try {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const txt = await response.text();
          try { data = JSON.parse(txt); } catch (e) { data = { message: txt } }
        }
      } catch (parseErr) {
        console.error("Response parse error:", parseErr);
        data = { message: "Unexpected server response" };
      }
      setIsLoading(false);

      if (response.ok) {
        if (credentials.role === "admin") {
          localStorage.setItem("adminUser", JSON.stringify(data));
          setIsLoggedIn(true);
        } else if (credentials.role === "hr") {
          navigate("/hr-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        alert(data.message || `Login failed (status ${response.status})`);
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  if (isLoggedIn) return <AdminPage />;

  // Signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignupForm()) return;
    setIsSignupLoading(true);

    let url = "";
    if (signupData.role === "admin") {
      url = "/api/admins/create";
    } else if (signupData.role === "employee") {
      url = "/api/employees/create";
    } else if (signupData.role === "hr") {
      url = "/api/hr/create";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData)  // Sends "name" field for all roles
      });
      // Safely parse JSON or fallback to text to avoid unhandled parse errors
      let data = {};
      try {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const txt = await response.text();
          try { data = JSON.parse(txt); } catch (e) { data = { message: txt } }
        }
      } catch (parseErr) {
        console.error("Response parse error:", parseErr);
        data = { message: "Unexpected server response" };
      }
      setIsSignupLoading(false);

      if (response.ok) {
        if (signupData.role === "admin") {
          alert("Admin account created successfully!");
          closeSignup();
          setIsLoginOpen(true);
          setCredentials({
            loginId: signupData.email,
            password: signupData.password,
            role: "admin"
          });
        } else {
          alert("Signup request sent! Wait for admin approval. You'll receive your ID via SMS.");
          closeSignup();
        }
      } else {
        alert(data.message || `Signup failed (status ${response.status})`);
      }
    } catch (err) {
      setIsSignupLoading(false);
      console.error(err);
      alert(err.message || "Something went wrong. Please try again.");
    }
  };

  // Open/Close popups
  const openLogin = () => { setIsLoginOpen(true); setIsSignupOpen(false); };
  const openSignup = () => { setIsSignupOpen(true); setIsLoginOpen(false); };
  const closeLogin = () => { 
    setIsLoginOpen(false); 
    setCredentials({ loginId: "", password: "", role: "employee" }); 
    setErrors({}); 
  };
  const closeSignup = () => { 
    setIsSignupOpen(false); 
    setSignupData({ 
      role: "employee", 
      name: "", 
      username: "", 
      password: "", 
      email: "", 
      mobile: "", 
      gender: "", 
      department: "" 
    }); 
    setSignupErrors({}); 
  };

  const goBackToLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
    setSignupData({
      role: "employee",
      name: "",
      username: "",
      password: "",
      email: "",
      mobile: "",
      gender: "",
      department: "",
    });
    setSignupErrors({});
  };

  const goBackToHomepage = () => {
    setIsLoginOpen(false);
    setCredentials({ loginId: "", password: "", role: "employee" });
    setErrors({});
  };

  return (
    <div className="home-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Logo size="medium" />
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="/" className="active">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><button className="login-btn-nav" onClick={openLogin}><span>Login</span></button></li>
              <li><button className="signup-btn-nav" onClick={openSignup}><span>Sign Up</span></button></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Employee Management System Pro</h1>
            <p>Streamline your workforce management with our comprehensive EMS solution designed for modern businesses</p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={openSignup}><span>Get Started</span></button>
              <button className="cta-button secondary" onClick={openLogin}><span>Employee Login</span></button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="IT Solutions" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Key Features</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-users"></i></div>
              <h3>Employee Management</h3>
              <p>Comprehensive employee profiles, attendance tracking, and performance management tools</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-chart-line"></i></div>
              <h3>Analytics & Reports</h3>
              <p>Detailed insights and reports to help you make informed decisions about your workforce</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-shield-alt"></i></div>
              <h3>Security First</h3>
              <p>Enterprise-grade security to protect your sensitive employee data and ensure compliance</p>
            </div>
            <div className="service-card">
              <div className="service-icon"><i className="fas fa-mobile-alt"></i></div>
              <h3>Mobile Ready</h3>
              <p>Access your employee management system from anywhere with our responsive mobile interface</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - FIXED */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><h3>500+</h3><p>Companies Trust Us</p></div>
            <div className="stat-item"><h3>50K+</h3><p>Employees Managed</p></div>
            <div className="stat-item"><h3>99.9%</h3><p>Uptime Guarantee</p></div>
            <div className="stat-item"><h3>24/7</h3><p>Support Available</p></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>EMS Pro</h3>
              <p>Empowering businesses with intelligent employee management solutions.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p><i className="fas fa-map-marker-alt"></i> 123 Tech Street, City</p>
              <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
              <p><i className="fas fa-envelope"></i> info@emspro.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 EMS Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* LOGIN POPUP */}
      {isLoginOpen && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={closeLogin}><i className="fas fa-times"></i></button>
            <div className="login-header">
              <div className="logo"><i className="fas fa-lock"></i></div>
              <h2>Login Portal</h2>
              <p>Welcome back! Please sign in to continue</p>
            </div>
            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="role">Login As</label>
                <div className="input-with-icon">
                  <i className="fas fa-user-tag"></i>
                  <select id="role" name="role" value={credentials.role} onChange={handleInputChange}>
                    <option value="employee">Employee</option>
                    <option value="hr">HR Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="loginId">
                  {credentials.role === "admin" ? "Email" : credentials.role === "hr" ? "HR ID" : "Employee ID"}
                </label>
                <div className="input-with-icon">
                  <i className={credentials.role === "admin" ? "fas fa-envelope" : "fas fa-id-card"}></i>
                  <input
                    type={credentials.role === "admin" ? "email" : "text"}
                    id="loginId"
                    name="loginId"
                    value={credentials.loginId}
                    onChange={handleInputChange}
                    placeholder={
                      credentials.role === "admin"
                        ? "Enter your email"
                        : credentials.role === "hr"
                        ? "Enter your HR ID"
                        : "Enter your Employee ID"
                    }
                    className={errors.loginId ? "error" : ""}
                  />
                </div>
                {errors.loginId && <span className="error-message">{errors.loginId}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={credentials.password} 
                    onChange={handleInputChange} 
                    placeholder="Enter your password" 
                    className={errors.password ? "error" : ""}/>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <button type="submit" className={`login-btn ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Authenticating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i> <span>Login</span>
                  </>
                )}
              </button>
              <div className="back-to-homepage">
                <button type="button" className="back-btn" onClick={goBackToHomepage}>
                  <i className="fas fa-arrow-left"></i> Back to Homepage
                </button>
              </div>
              <div className="signup-link">
                <p>Don't have an account? <button type="button" onClick={openSignup}>Sign up here</button></p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP POPUP */}
      {isSignupOpen && (
        <div className="login-popup-overlay">
          <div className="login-popup signup-popup">
            <button className="close-btn" onClick={closeSignup}><i className="fas fa-times"></i></button>
            <div className="login-header">
              <div className="logo"><i className="fas fa-user-plus"></i></div>
              <h2>Create Account</h2>
              <p>Join our platform by creating a new account</p>
            </div>
            <form onSubmit={handleSignupSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="signup-role">Register As</label>
                <div className="input-with-icon">
                  <i className="fas fa-user-tag"></i>
                  <select id="signup-role" name="role" value={signupData.role} onChange={handleSignupInputChange}>
                    <option value="employee">Employee</option>
                    <option value="hr">HR Manager</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={signupData.name} 
                    onChange={handleSignupInputChange} 
                    placeholder="Enter your full name" 
                    className={signupErrors.name ? "error" : ""}/>
                </div>
                {signupErrors.name && <span className="error-message">{signupErrors.name}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <div className="input-with-icon">
                  <i className="fas fa-user-circle"></i>
                  <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={signupData.username} 
                    onChange={handleSignupInputChange} 
                    placeholder="Choose a username" 
                    className={signupErrors.username ? "error" : ""}/>
                </div>
                {signupErrors.username && <span className="error-message">{signupErrors.username}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <div className="input-with-icon">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={signupData.email} 
                    onChange={handleSignupInputChange} 
                    placeholder="Enter your email" 
                    className={signupErrors.email ? "error" : ""}/>
                </div>
                {signupErrors.email && <span className="error-message">{signupErrors.email}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    id="password-signup" 
                    name="password" 
                    value={signupData.password} 
                    onChange={handleSignupInputChange} 
                    placeholder="Enter password" 
                    className={signupErrors.password ? "error" : ""}/>
                </div>
                {signupErrors.password && <span className="error-message">{signupErrors.password}</span>}
              </div>
              {signupData.role !== "admin" && (
                <>
                  <div className="input-group">
                    <label htmlFor="mobile">Mobile</label>
                    <div className="input-with-icon">
                      <i className="fas fa-phone"></i>
                      <input 
                        type="text" 
                        id="mobile" 
                        name="mobile" 
                        value={signupData.mobile} 
                        onChange={handleSignupInputChange} 
                        placeholder="Enter mobile number" />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <div className="input-with-icon">
                      <i className="fas fa-venus-mars"></i>
                      <select id="gender" name="gender" value={signupData.gender} onChange={handleSignupInputChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              {signupData.role === "employee" && (
                <div className="input-group">
                  <label htmlFor="department">Department</label>
                  <div className="input-with-icon">
                    <i className="fas fa-building"></i>
                    <input 
                      type="text" 
                      id="department" 
                      name="department" 
                      value={signupData.department} 
                      onChange={handleSignupInputChange} 
                      placeholder="Enter your department" />
                  </div>
                </div>
              )}
              <button type="submit" className={`login-btn ${isSignupLoading ? "loading" : ""}`} disabled={isSignupLoading}>
                {isSignupLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Creating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus"></i> <span>Sign Up</span>
                  </>
                )}
              </button>
              <div className="back-to-login">
                <button type="button" className="back-btn" onClick={goBackToLogin}>
                  <i className="fas fa-arrow-left"></i> Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;