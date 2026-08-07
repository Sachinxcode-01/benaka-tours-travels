import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down" | "none";

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [scrollDir, setScrollDir] = useState<ScrollDirection>("none");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        return;
      }

      setScrollDir(scrollY > lastScrollY ? "down" : "up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, [threshold]);

  return scrollDir;
}
