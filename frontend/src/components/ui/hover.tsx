import React, { ReactNode, useState } from "react";

interface HoverProps {
  children: (isHovered: boolean, isClicked: boolean) => ReactNode;
  hoverStyle: React.CSSProperties;
  clickStyle: React.CSSProperties;
  onClick?: () => void;
}

const Hover = ({ children, hoverStyle, clickStyle, onClick }: HoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      onClick={handleClick}
      style={{
        ...hoverStyle,
        ...(isClicked ? clickStyle : {}),
        transition: "all 0.5s ease-in-out",
        cursor: "pointer",
      }}
    >
      {children(isHovered, isClicked)}
    </div>
  );
};

export default Hover;
