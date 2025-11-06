import React from 'react';
import '../pagescss/about.css';

const AboutPage = () => {
  return (
    <div className="about-wrapper">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <div className="logo-icon">
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="url(#gradient1)" stroke="#2c3e50" strokeWidth="2"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.8"/>
                <path d="M50 25C45.5817 25 42 28.5817 42 33C42 37.4183 45.5817 41 50 41C54.4183 41 58 37.4183 58 33C58 28.5817 54.4183 25 50 25Z" fill="#ffffff"/>
                <path d="M35 65C35 55 42 50 50 50C58 50 65 55 65 65V75H35V65Z" fill="#ffffff"/>
                <line x1="20" y1="20" x2="30" y2="30" stroke="#3498db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="80" y1="20" x2="70" y2="30" stroke="#3498db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="20" y1="80" x2="30" y2="70" stroke="#3498db" strokeWidth="3" strokeLinecap="round"/>
                <line x1="80" y1="80" x2="70" y2="70" stroke="#3498db" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3498db" />
                    <stop offset="100%" stopColor="#2c3e50" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="logo-text">EMS Pro</span>
          </div>
          <nav className="navigation">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about" className="active">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About EMS Pro</h1>
            <p>Streamlining employee management with cutting-edge technology</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="about-main">
        <div className="container">
          {/* Mission Section */}
          <section className="mission-section">
            <div className="section-content">
              <div className="text-content">
                <h2>Our Mission</h2>
                <p>
                  At EMS Pro, we believe that effective employee management is the cornerstone of organizational success. 
                  Our mission is to provide comprehensive, user-friendly solutions that empower businesses to manage 
                  their workforce efficiently and effectively.
                </p>
                <p>
                  We combine cutting-edge technology with intuitive design to create an employee management system 
                  that not only meets today's needs but anticipates tomorrow's challenges.
                </p>
              </div>
              <div className="image-content">
                <div className="mission-image">
                  <i className="fas fa-bullseye"></i>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <h2>Why Choose EMS Pro?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Employee Management</h3>
                <p>Comprehensive employee profiles, attendance tracking, and performance management tools.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Analytics & Reports</h3>
                <p>Detailed insights and reports to help you make informed decisions about your workforce.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Security First</h3>
                <p>Enterprise-grade security to protect your sensitive employee data and ensure compliance.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-mobile-alt"></i>
                </div>
                <h3>Mobile Ready</h3>
                <p>Access your employee management system from anywhere with our responsive mobile interface.</p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Sarah Johnson</h3>
                <p className="role">CEO & Founder</p>
                <p className="bio">Visionary leader with 15+ years in HR technology.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Michael Chen</h3>
                <p className="role">CTO</p>
                <p className="bio">Technology expert focused on scalable solutions.</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h3>Emily Rodriguez</h3>
                <p className="role">Head of Design</p>
                <p className="bio">Creating intuitive user experiences that delight.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

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
              <h4>Contact Info</h4>
              <p><i className="fas fa-envelope"></i> info@emspro.com</p>
              <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 EMS Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
