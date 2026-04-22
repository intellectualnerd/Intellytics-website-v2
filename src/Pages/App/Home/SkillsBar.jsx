import React, { useEffect, useRef, useState } from "react";

const SkillsBar = ({ skills }) => {
  const containerRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(3); // initial guess

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkLoopFill = () => {
      const parentWidth = container.parentElement.offsetWidth;
      const contentWidth = container.scrollWidth / repeatCount;

      // Ensure content length is at least twice parent for seamless loop
      let newRepeatCount = Math.ceil((parentWidth * 2) / contentWidth);
      setRepeatCount(newRepeatCount || 1);

      // Speed: 40px/sec (adjustable)
      const totalScrollWidth = (contentWidth * newRepeatCount) / 2;
      container.style.setProperty("--scroll-width", `${totalScrollWidth}px`);
      container.style.setProperty(
        "--scroll-duration",
        `${totalScrollWidth / 40}s`
      );
    };

    // Allow layout to finish first
    setTimeout(checkLoopFill, 100);
    window.addEventListener("resize", checkLoopFill);
    return () => window.removeEventListener("resize", checkLoopFill);
  }, [skills, repeatCount]);

  return (
    <div className="myskills_bar">
      <div className="scrolling-content" ref={containerRef}>
        {[...Array(repeatCount)].map((_, i) => (
          <div className="skills-loop" key={i}>
            {skills.map((skill, j) => (
              <div
                key={`${i}-${j}`}
                className="skill-item d-flex align-items-center"
              >
                <span className="merriweather capital">{skill}</span>
                <svg
                  className="mx-3"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="3.81789"
                    cy="3.71036"
                    r="3.5"
                    transform="rotate(3 3.81789 3.71036)"
                    fill="#f7ba62"
                  />
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsBar;
