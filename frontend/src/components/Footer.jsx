import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <span className="brand-icon">✨</span>
          <span className="brand-text">CourseHub</span>
          <p className="footer-tagline">Empowering your learning journey with premium courses and interactive experiences.</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Platform</h4>
            <a href="#">Browse Courses</a>
            <a href="#">Learning Paths</a>
            <a href="#">Pricing</a>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CourseHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
