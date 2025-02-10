"use client";

import { getSeasonColor } from "@/utils/SeasonUtils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Component defining the scroll-to-top button
const ScrollButton = () => {
  // get the seasonal color
  const seasonalColor = getSeasonColor();
  // set the visibility state
  const [isVisible, setIsVisible] = useState(false);

  // function to toggle button visibility
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // add event listener to the window
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className="fixed bottom-0 right-0 z-10 flex w-auto justify-end p-8"
      data-testid="scroll-button"
      tabIndex={0}
      aria-label="Zum Seitenanfang scrollen"
    >
      {isVisible && (
        <motion.div
          className="group relative cursor-pointer"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            viewBox="0 0 66 63"
            fill="none"
            className={`h-20 w-20 cursor-pointer rounded-full bg-${seasonalColor}-dark opacity-80 hover:opacity-100`}
          >
            <motion.path
              d="M64.4219 31.3321C64.4219 48.0439 50.2654 61.6642 32.7109 61.6642C15.1564 61.6642 1 48.0439 1 31.3321C1 14.6203 15.1564 1 32.7109 1C50.2654 1 64.4219 14.6203 64.4219 31.3321Z"
              className="fill-opacity-100 stroke-2"
            />
            <motion.path
              d="M33.418 20.8307C33.0275 20.4402 32.3944 20.4402 32.0038 20.8307L25.6399 27.1947C25.2493 27.5852 25.2493 28.2184 25.6399 28.6089C26.0304 28.9994 26.6636 28.9994 27.0541 28.6089L32.7109 22.9521L38.3678 28.6089C38.7583 28.9994 39.3915 28.9994 39.782 28.6089C40.1725 28.2184 40.1725 27.5852 39.782 27.1947L33.418 20.8307ZM33.7109 41.1262V21.5378H31.7109V41.1262H33.7109Z"
              className="fill-[#FBFCF8] stroke-[#FBFCF8] stroke-[0.5] transition-transform duration-300 group-hover:-translate-y-2"
            />
            <motion.path
              className="fill-[#FBFCF8] stroke-[#FBFCF8] stroke-[0.5] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              d="M21.7209 49.958V40.613H18.3759V39.458H26.3259V40.613H22.9809V49.958H21.7209ZM32.3523 50.138C31.3423 50.138 30.4473 49.908 29.6673 49.448C28.8873 48.988 28.2773 48.348 27.8373 47.528C27.3973 46.708 27.1773 45.768 27.1773 44.708C27.1773 43.638 27.3923 42.698 27.8223 41.888C28.2623 41.068 28.8673 40.428 29.6373 39.968C30.4073 39.508 31.2973 39.278 32.3073 39.278C33.3173 39.278 34.2073 39.513 34.9773 39.983C35.7573 40.443 36.3623 41.083 36.7923 41.903C37.2223 42.713 37.4373 43.648 37.4373 44.708C37.4373 45.768 37.2223 46.708 36.7923 47.528C36.3623 48.348 35.7623 48.988 34.9923 49.448C34.2323 49.908 33.3523 50.138 32.3523 50.138ZM32.3523 48.983C33.1023 48.983 33.7623 48.803 34.3323 48.443C34.9023 48.073 35.3473 47.568 35.6673 46.928C35.9973 46.288 36.1623 45.548 36.1623 44.708C36.1623 43.878 35.9973 43.143 35.6673 42.503C35.3373 41.853 34.8823 41.348 34.3023 40.988C33.7323 40.618 33.0673 40.433 32.3073 40.433C31.5573 40.433 30.8923 40.618 30.3123 40.988C29.7323 41.348 29.2773 41.853 28.9473 42.503C28.6173 43.143 28.4523 43.878 28.4523 44.708C28.4523 45.548 28.6173 46.288 28.9473 46.928C29.2773 47.568 29.7373 48.073 30.3273 48.443C30.9173 48.803 31.5923 48.983 32.3523 48.983ZM39.5278 49.958V39.458H42.9478C43.6278 39.458 44.2278 39.598 44.7478 39.878C45.2778 40.158 45.6878 40.548 45.9778 41.048C46.2778 41.548 46.4278 42.128 46.4278 42.788C46.4278 43.428 46.2928 43.998 46.0228 44.498C45.7528 44.998 45.3828 45.393 44.9128 45.683C44.4428 45.963 43.8978 46.103 43.2778 46.103H40.8028V49.958H39.5278ZM40.8028 44.948H43.2778C43.8278 44.948 44.2778 44.748 44.6278 44.348C44.9878 43.938 45.1678 43.418 45.1678 42.788C45.1678 42.138 44.9578 41.613 44.5378 41.213C44.1178 40.813 43.5828 40.613 42.9328 40.613H40.8028V44.948Z"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default ScrollButton;
