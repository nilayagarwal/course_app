import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CourseCard from "../../components/CourseCard";
import { BASE_URL, getHeaders } from "../../api";
import "../Dashboard.css";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "admin") {
      navigate("/admin");
      return;
    }
    fetchAdminCourses();
  }, [navigate]);

  const fetchAdminCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admin/course/bulk`, {
        headers: getHeaders()
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error("Failed to load your courses");
      
      setCourses(data.courses || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`${BASE_URL}/admin/course`, {
        method: "DELETE",
        headers: getHeaders(),
        body: JSON.stringify({ courseId })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || "Failed to delete course");
      
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="heading-xl">Creator <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(135deg, var(--danger), var(--accent))' }}>Dashboard</span></h1>
          <p className="text-lg">Manage your courses and empower students.</p>
        </div>
        <Link to="/admin/course" className="btn btn-primary">
          + Create New Course
        </Link>
      </div>

      {error ? (
        <div className="error-message glass-panel">{error}</div>
      ) : courses.length === 0 ? (
        <div className="empty-state glass-panel animate-fade-in delay-100">
          <div className="empty-icon">🎥</div>
          <h3>No Courses Yet</h3>
          <p>You haven't created any courses yet. Share your knowledge with the world!</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate("/admin/course")}>
            Create First Course
          </button>
        </div>
      ) : (
        <div className="courses-grid animate-fade-in delay-100">
          {courses.map(course => (
            <div key={course._id} style={{ position: 'relative' }}>
               <CourseCard course={course} isPurchased={true} />
               <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px' }}>
                  <span className="badge" style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid var(--border-strong)', color: 'white', padding: '0.25rem 0.5rem' }}>Your Course</span>
                  <button 
                    onClick={() => handleDelete(course._id)}
                    style={{ background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.25rem 0.5rem', cursor: 'pointer', zIndex: 10 }}
                  >
                    Delete
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
