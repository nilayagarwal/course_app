import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // We'll create this

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // 'user' or 'admin'

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar glass-panel">
      <div className="container nav-content">
        <Link to="/" className="nav-brand">
          <span className="brand-icon">✨</span>
          <span className="brand-text">CourseHub</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/courses" className="nav-link">Explore</Link>
          
          {token ? (
            <>
              {role === "admin" ? (
                <Link to="/admin/dashboard" className="nav-link">Admin Panel</Link>
              ) : (
                <Link to="/dashboard" className="nav-link">My Learning</Link>
              )}
              <button className="btn btn-outline nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" className="nav-link">Login</Link>
              <Link to="/auth" className="btn btn-primary nav-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
