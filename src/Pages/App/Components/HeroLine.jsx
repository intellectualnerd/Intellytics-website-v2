import React from "react";

const HeroLine = ({ text = "", highlights = [] }) => {
  const getHighlightedText = () => {
    const parts = [];
    let remainingText = text;

    highlights.forEach((highlight, index) => {
      const splitIndex = remainingText.indexOf(highlight);
      if (splitIndex === -1) return; // If not found, skip

      if (splitIndex > 0) {
        parts.push(remainingText.slice(0, splitIndex));
      }

      parts.push(<span key={index}>{highlight}</span>);
      remainingText = remainingText.slice(splitIndex + highlight.length);
    });

    if (remainingText) {
      parts.push(remainingText);
    }

    return parts;
  };

  return <p className="bebas-neue-regular heroFonts">{getHighlightedText()}</p>;
};

export default HeroLine;
