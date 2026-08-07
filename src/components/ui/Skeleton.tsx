import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-[#1A1F2C]/80 border border-white/5 rounded-xl ${className}`}
    />
  );
};
