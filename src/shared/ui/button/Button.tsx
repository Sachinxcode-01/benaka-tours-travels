import React, { forwardRef } from "react";
import { motion } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@shared/lib/cn";
import { Spinner } from "../spinner/Spinner";

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-[44px] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-amber-500 text-neutral-950 hover:bg-amber-400 active:bg-amber-600 shadow-md",
        secondary:
          "bg-neutral-800 text-neutral-100 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-700",
        outline:
          "border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 active:bg-amber-500/20",
        ghost: "text-neutral-300 hover:bg-neutral-800/60 hover:text-white",
        danger: "bg-red-600 text-white hover:bg-red-500 active:bg-red-700",
      },
      size: {
        sm: "text-xs px-3 py-2 min-h-[36px]",
        md: "text-sm px-4 py-2.5 min-h-[44px]",
        lg: "text-base px-6 py-3 min-h-[48px]",
        xl: "text-lg px-8 py-4 min-h-[52px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends
    Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
    >,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={disabled || isLoading ? undefined : { scale: 1.03 }}
        whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {isLoading ? (
          <Spinner
            size="sm"
            className="mr-2 border-current border-t-transparent"
          />
        ) : leftIcon ? (
          <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        ) : null}

        <span>{children}</span>

        {!isLoading && rightIcon ? (
          <span className="ml-2 inline-flex items-center transition-transform group-hover:translate-x-1">
            {rightIcon}
          </span>
        ) : null}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
