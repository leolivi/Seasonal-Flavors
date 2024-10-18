"use client";
import { useEffect, useState } from "react";
import Sttb from "../../assets/icons/sttb.svg";

// interface HoverProps {
//   children: (isClicked: boolean) => ReactNode;
//   clickStyle: React.CSSProperties;
//   onClick?: () => void;
// }

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-0 right-0 z-10 flex w-auto justify-end p-8">
      <Sttb
        className={`h-20 w-20 cursor-pointer rounded-full bg-sfgreen-dark stroke-sfgreen-dark opacity-80 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={scrollToTop}
      ></Sttb>
    </div>
  );
};

export default ScrollButton;
