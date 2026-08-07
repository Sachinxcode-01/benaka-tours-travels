import React, { forwardRef } from "react";
import { cn } from "@shared/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-neutral-800 bg-neutral-900/80 p-5 text-neutral-100 shadow-sm backdrop-blur-sm transition-all duration-300",
          hoverable &&
            "hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-md hover:shadow-amber-500/5",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
