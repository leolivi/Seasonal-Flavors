import React, { useEffect, useRef, useState, ReactNode } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  children: ReactNode;
  className?: string;
  isInitialContent?: boolean;
}

const InfinityScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  children,
  className,
  isInitialContent = true,
}) => {
  const observerTarget = useRef(null);
  const [isVisible, setIsVisible] = useState(isInitialContent);

  useEffect(() => {
    const currentObserverTarget = observerTarget.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (hasMore) {
            loadMore();
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: "100px",
      },
    );

    if (currentObserverTarget) {
      observer.observe(currentObserverTarget);
    }

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
      {hasMore && <div ref={observerTarget} className="h-[40px]" />}
    </div>
  );
};

export default InfinityScroll;
