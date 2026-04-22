import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MyNavbar = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasBackground, setHasBackground] = useState(false); // ✅ new state

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // ✅ Background toggle
      if (currentScrollY > 50) {
        setHasBackground(true);
      } else {
        setHasBackground(false);
      }

      // ✅ Scroll direction logic
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  const navexpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav
      className={`mynav 
        ${isExpanded ? "expanded" : ""} 
        ${hasBackground ? "scrolled" : ""}
      `}
    >
      <div
        className={`mycontainer nav-container ${
          isExpanded ? "vertical" : ""
        }`}
      >
        {/* Logo */}
        <div className="mylogo">
          <img src={"/logo.png"} alt="Intellytics logo" className="logo-img" />
          <span className="merriweather">Intellytics</span>
        </div>

        {/* Links */}
        <ul
          className={`mylinks ${
            isExpanded ? "vertical viewable" : "horizontal"
          }`}
        >
          <li className="active hover-target">Home</li>
          <li className="hover-target">Services</li>
          <li className="hover-target">Careers</li>
          <li className="hover-target">Journals</li>
          <li className="hover-target">About</li>
          <li className="hover-target contactButton">Contact</li>
        </ul>

        {/* Hamburger */}
        <button className="mybutton" onClick={navexpand}>
          <div className="navOpenButton">
            <div className={`line1 ${isExpanded ? "rotate1" : ""}`}></div>
            <div className={`line2 ${isExpanded ? "rotate2" : ""}`}></div>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default MyNavbar;