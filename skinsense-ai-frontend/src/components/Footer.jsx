import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <div className="brand-logo">
            <Heart className="logo-icon" />
            <h3>SkinSense AI</h3>
          </div>
          <p>Empowering early detection and personalized skin care through advanced AI technology.</p>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">How it Works</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section support">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Support</a></li>
            <li><a href="#">Medical Disclaimer</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact</h4>
          <div className="contact-item">
            <Mail className="contact-icon" />
            <span>support@skinsense.ai</span>
          </div>
          <div className="contact-item">
            <Phone className="contact-icon" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="contact-item">
            <MapPin className="contact-icon" />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 SkinSense AI. All rights reserved.</p>
        <div className="social-links">
          <a href="#" className="social-icon facebook"></a>
          <a href="#" className="social-icon twitter"></a>
          <a href="#" className="social-icon linkedin"></a>
        </div>
      </div>
    </footer>
  );
}