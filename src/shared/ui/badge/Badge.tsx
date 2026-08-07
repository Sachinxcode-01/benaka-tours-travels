import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@shared/lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        gold: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        available:
          "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        booked: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
        neutral: "bg-neutral-800 text-neutral-300 border border-neutral-700",
        outline: "text-neutral-300 border border-neutral-700",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  children,
  ...props
}) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
};
