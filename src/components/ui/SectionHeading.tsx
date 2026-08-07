import React from "react";
import { AnimatedBadge } from "./AnimatedBadge";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  center = true,
  className = "",
}) => {
  return (
    <div
      className={`mb-12 ${center ? "text-center" : "text-left"} ${className}`}
    >
      {badge && (
        <div
          className={`mb-3 flex ${center ? "justify-center" : "justify-start"}`}
        >
          <AnimatedBadge text={badge} />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title.split(" ").map((word, i) => {
          if (
            word.toLowerCase() === "benaka" ||
            word.toLowerCase() === "fleet" ||
            word.toLowerCase() === "rental"
          ) {
            return (
              <span
                key={i}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] mr-2"
              >
                {word}{" "}
              </span>
            );
          }
          return <span key={i}>{word} </span>;
        })}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
