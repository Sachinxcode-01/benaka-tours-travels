import React from "react";
import { cn } from "@shared/lib/cn";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-neutral-800/80", className)}
      {...props}
    />
  );
};
