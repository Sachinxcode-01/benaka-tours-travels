import React from "react";
import { cn } from "@shared/lib/cn";

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span className={cn("sr-only", className)} {...props}>
      {children}
    </span>
  );
};
