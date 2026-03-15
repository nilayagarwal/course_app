import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getHeaders } from "../../api";
import "./CreateCourse.css";

export default function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/admin/course`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create course");
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-course-page container">
      <div className="form-container glass-panel animate-fade-in">
        <div className="form-header">
          <h2 className="heading-lg">Create New Course</h2>
          <p className="text-muted">Fill in the details to publish a new course to the catalog.</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label className="form-label">Course Title</label>
            <input 
              type="text" name="title" className="form-input" 
              value={formData.title} onChange={handleChange} required 
              placeholder="e.g. Advanced Meta Frameworks in React"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description" className="form-input" rows="5"
              value={formData.description} onChange={handleChange} required 
              placeholder="Provide a detailed overview of what students will learn..."
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price ($)</label>
              <input 
                type="number" name="price" className="form-input" min="0" step="0.01"
                value={formData.price} onChange={handleChange} required 
                placeholder="49.99"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cover Image URL</label>
              <input 
                type="url" name="imageUrl" className="form-input" 
                value={formData.imageUrl} onChange={handleChange} required 
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          <div className="form-preview">
            <label className="form-label">Cover Preview</label>
            <div className="preview-box">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Course cover" />
              ) : (
                <div className="preview-placeholder">Image Preview</div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => navigate("/admin/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Publishing..." : "Publish Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
