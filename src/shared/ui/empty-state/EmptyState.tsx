import React from "react";
import { SearchX } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { Button } from "../button/Button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  description = "Try adjusting your search criteria or filter selections.",
  icon = <SearchX className="h-10 w-10 text-amber-400/80" />,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-amber-500/10 p-4">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
