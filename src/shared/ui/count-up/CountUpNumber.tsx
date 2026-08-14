import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@shared/lib/motion";

interface CountUpNumberProps {
  end: number;
  decimals?: number;
  duration?: number; // seconds
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  end,
  decimals = 0,
  duration = 1.6,
  suffix = "",
  prefix = "",
  className = "",
}) => {
  const [value, setValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(end);
      setHasAnimated(true);
      return;
    }

    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          let startTime: number | null = null;
          const startVal = 0;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min(
              (timestamp - startTime) / (duration * 1000),
              1,
            );
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = startVal + (end - startVal) * easeProgress;

            setValue(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setValue(end);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated, shouldReduceMotion]);

  const formatted =
    prefix +
    (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()) +
    suffix;

  return (
    <span ref={ref} className={className}>
      {hasAnimated || shouldReduceMotion ? formatted : `${prefix}0${suffix}`}
    </span>
  );
};
