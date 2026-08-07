import React, { forwardRef } from "react";
import { cn } from "@shared/lib/cn";
import { Button, type ButtonProps } from "../button/Button";

export interface IconButtonProps extends Omit<
  ButtonProps,
  "leftIcon" | "rightIcon"
> {
  icon: React.ReactNode;
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "p-2 min-w-[44px] min-h-[44px] justify-center",
          className,
        )}
        {...props}
      >
        {icon}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";
