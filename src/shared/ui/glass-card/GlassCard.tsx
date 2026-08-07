import React, { forwardRef } from "react";
import { cn } from "@shared/lib/cn";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-amber-500/20 bg-neutral-900/60 p-6 text-neutral-100 shadow-xl backdrop-blur-md transition-all duration-300",
          hoverable &&
            "hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-amber-500/10",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
