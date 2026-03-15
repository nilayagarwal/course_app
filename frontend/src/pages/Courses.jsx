import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import { BASE_URL, getHeaders } from "../api";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/course/preview`);
      const data = await response.json();
      
      if (!response.ok) throw new Error("Failed to fetch courses");
      
      setCourses(data.courses);
    } catch (err) {
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (courseId) => {
    try {
      setPurchaseStatus({ id: courseId, status: "loading" });
      const response = await fetch(`${BASE_URL}/course/purchase`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ courseId })
      });

      const data = await response.json();

      if (!response.ok) {
        if(response.status === 403) {
           throw new Error("Please log in to purchase courses.");
        }
        throw new Error(data.message || "Purchase failed");
      }

      setPurchaseStatus({ id: courseId, status: "success", message: "Purchase successful!" });
      setTimeout(() => setPurchaseStatus(null), 3000);
    } catch (err) {
      setPurchaseStatus({ id: courseId, status: "error", message: err.message });
      setTimeout(() => setPurchaseStatus(null), 3000);
    }
  };

  if (loading) return <div className="page-loader"><div className="spinner"></div></div>;

  return (
    <div className="courses-page container">
      <div className="section-header animate-fade-in">
        <h1 className="heading-xl">Explore <span className="text-gradient">Courses</span></h1>
        <p className="text-lg">Discover our premium selection of courses to level up your skills.</p>
      </div>

      {error ? (
        <div className="error-message glass-panel">{error}</div>
      ) : (
        <div className="courses-grid delay-100 animate-fade-in">
          {courses.map(course => (
            <div key={course._id} className="course-card-wrapper">
              <CourseCard 
                course={course} 
                onPurchase={handlePurchase} 
              />
              {purchaseStatus?.id === course._id && (
                <div className={`purchase-toast ${purchaseStatus.status}`}>
                  {purchaseStatus.status === "loading" ? "Processing..." : purchaseStatus.message}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
