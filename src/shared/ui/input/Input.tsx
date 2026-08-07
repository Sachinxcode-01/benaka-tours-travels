import React, { forwardRef } from "react";
import { cn } from "@shared/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftIcon, id, ...props }, ref) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 shadow-sm transition-colors min-h-[44px]",
              "focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className,
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs font-medium text-red-400">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-400">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
