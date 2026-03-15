import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        
        <div className="container hero-content animate-fade-in">
          <span className="badge">New Courses Added Weekly</span>
          <h1 className="heading-xl hero-title">
            Master the Future with <br />
            <span className="text-gradient">Premium Courses</span>
          </h1>
          <p className="text-lg hero-subtitle delay-100">
            Elevate your skills with expert-led tutorials. Learn cutting-edge technologies, build real-world projects, and accelerate your career journey today.
          </p>
          
          <div className="hero-actions delay-200">
            <Link to="/courses" className="btn btn-primary btn-lg">
              Explore Courses
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link to="/auth" className="btn btn-outline btn-lg">
              Join for Free
            </Link>
          </div>
          
          <div className="stats-container delay-300">
            <div className="stat-item glass-panel">
              <h3>50+</h3>
              <p>Expert Curated Courses</p>
            </div>
            <div className="stat-item glass-panel">
              <h3>10k+</h3>
              <p>Active Students</p>
            </div>
            <div className="stat-item glass-panel">
              <h3>4.9/5</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <div className="section-header">
          <h2 className="heading-lg">Why Choose CourseHub?</h2>
          <p className="text-lg">Experience a learning platform designed for your success.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-primary-glow">💻</div>
            <h3>Learn by Doing</h3>
            <p>Interactive projects and real-world scenarios to ensure you master the skills, not just the theory.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-accent-glow">🚀</div>
            <h3>Lifetime Access</h3>
            <p>Pay once, own the course forever. Revisit the material anytime you need a refresher.</p>
          </div>
          <div className="feature-card glass-panel">
            <div className="feature-icon bg-success-glow">🌟</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry veterans who have worked at top tech companies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
