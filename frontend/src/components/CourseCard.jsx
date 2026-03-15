import { useState } from "react";
import "./CourseCard.css";

export default function CourseCard({ course, onPurchase, isPurchased }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="course-card glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-image-container">
        <img 
          src={course.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"} 
          alt={course.title} 
          className="card-image" 
        />
        <div className={`card-overlay ${isHovered ? 'visible' : ''}`}>
          <span className="price-tag">${course.price}</span>
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{course.title}</h3>
        <p className="card-description">{course.description}</p>
        
        <div className="card-actions">
          {isPurchased ? (
            <button className="btn btn-primary w-full" disabled>
              Owned
            </button>
          ) : (
            <button 
              className="btn btn-primary w-full" 
              onClick={() => onPurchase(course._id)}
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
