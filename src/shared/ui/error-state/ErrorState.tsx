import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { Button } from "../button/Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Unable to load data",
  description = "An error occurred while fetching information. Please try again.",
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-rose-500/20 bg-rose-950/10 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-rose-500/10 p-4 text-rose-400">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
