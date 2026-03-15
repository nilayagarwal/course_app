import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { BASE_URL, getHeaders } from "../api";
import "./Dashboard.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return;
    }
    fetchPurchases();
  }, [navigate]);

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/purchases`, {
        headers: getHeaders()
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error("Failed to load your learning dashboard");
      
      setCourses(data.coursesData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="dashboard-page container">
      <div className="dashboard-header animate-fade-in">
        <h1 className="heading-xl">My <span className="text-gradient">Learning</span></h1>
        <p className="text-lg">Welcome back! Pick up right where you left off.</p>
      </div>

      {error ? (
        <div className="error-message glass-panel">{error}</div>
      ) : courses.length === 0 ? (
        <div className="empty-state glass-panel animate-fade-in delay-100">
          <div className="empty-icon">📚</div>
          <h3>Your Library is Empty</h3>
          <p>It looks like you haven't enrolled in any courses yet.</p>
          <button className="btn btn-primary mt-4" onClick={() => navigate("/courses")}>
            Explore Courses
          </button>
        </div>
      ) : (
        <div className="courses-grid animate-fade-in delay-100">
          {courses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              isPurchased={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
