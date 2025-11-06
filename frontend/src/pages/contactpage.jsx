import React, { useState } from 'react';
import '../pagescss/contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="contact-wrapper">
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
              <li><a href="/about">About</a></li>
              <li><a href="/contact" className="active">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="contact-main">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-with-icon">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <div className="input-with-icon">
                    <i className="fas fa-tag"></i>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <div className="textarea-with-icon">
                    <i className="fas fa-comment"></i>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="6"
                      required
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-content">
                    <h3>Address</h3>
                    <p>123 Business Street<br />Suite 100<br />New York, NY 10001</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>+1 (555) 123-4567<br />Mon-Fri 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>info@emspro.com<br />support@emspro.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-content">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

export default ContactPage;
