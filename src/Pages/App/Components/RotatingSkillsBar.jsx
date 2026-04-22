import { useEffect, useRef } from "react";
import "../../CSS/RotatingSkillsBar.css";

const RotatingSkillsBar = () => {
  const skills = ["HTML", "CSS", "ReactJS", "JavaScript", "Node.js", "Python"];
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    let offset = 0;

    const animate = () => {
      offset -= 1; // Speed of scrolling
      marquee.style.transform = `translateX(${offset}px)`;

      if (Math.abs(offset) >= marquee.scrollWidth / 2) {
        offset = 0;
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee" ref={marqueeRef}>
        {[...skills, ...skills].map((skill, index) => (
          <span key={index} className="skill">
            {skill} <span className="separator">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default RotatingSkillsBar;
