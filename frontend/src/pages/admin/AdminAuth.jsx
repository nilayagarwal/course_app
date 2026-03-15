import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api";
import "../Auth.css"; // Reuse existing auth styles

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/admin/signin" : "/admin/signup";
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard");
      } else {
        setIsLogin(true);
        setError("Admin signup successful! Please login.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-blob auth-blob-1" style={{ background: 'var(--danger)' }}></div>
      <div className="auth-blob auth-blob-2" style={{ background: 'var(--accent)' }}></div>
      
      <div className="auth-card glass-panel animate-fade-in">
        <div className="auth-header">
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>Admin Portal</span>
          <h2 className="heading-lg">{isLogin ? "Admin Login" : "Admin Registration"}</h2>
          <p className="text-muted">
            {isLogin ? "Access your creator dashboard" : "Apply as a new course creator"}
          </p>
        </div>

        {error && (
          <div className={`auth-alert ${error.includes("successful") ? "success" : "error"}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input 
                  type="text" name="firstname" className="form-input" 
                  value={formData.firstname} onChange={handleChange} required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input 
                  type="text" name="lastname" className="form-input" 
                  value={formData.lastname} onChange={handleChange} required 
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" name="email" className="form-input" 
              value={formData.email} onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" name="password" className="form-input" 
              value={formData.password} onChange={handleChange} required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-full auth-submit" style={{ background: 'linear-gradient(135deg, var(--danger), var(--accent))' }} disabled={loading}>
            {loading ? "Processing..." : (isLogin ? "Access Dashboard" : "Register as Admin")}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Need a creator account?" : "Already a creator?"}
            <button className="btn-link" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
              {isLogin ? "Register" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
