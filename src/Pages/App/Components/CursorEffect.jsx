import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 }); // Store the target position

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
    };

    const smoothMove = () => {
      if (cursorRef.current) {
        const currentX = parseFloat(cursorRef.current.style.left || 0);
        const currentY = parseFloat(cursorRef.current.style.top || 0);

        // Interpolate between current and target positions for smooth transition
        const targetX = positionRef.current.x;
        const targetY = positionRef.current.y;

        const newX = currentX + (targetX - currentX) * 0.2; // Adjust 0.1 for smoothness
        const newY = currentY + (targetY - currentY) * 0.2;

        cursorRef.current.style.left = `${newX}px`;
        cursorRef.current.style.top = `${newY}px`;

        // Recursively call smoothMove for continuous updates
        animationFrameId = requestAnimationFrame(smoothMove);
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const attachHoverListeners = () => {
      const hoverElements = document.querySelectorAll(".hover-target");
      hoverElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    const observer = new MutationObserver(() => {
      attachHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", handleMouseMove);
    attachHoverListeners();
    smoothMove(); // Start the animation loop

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      const hoverElements = document.querySelectorAll(".hover-target");
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "hovering" : ""}`}
      style={{ position: "fixed", left: "0px", top: "0px" }}
    ></div>
  );
};

export default CustomCursor;
