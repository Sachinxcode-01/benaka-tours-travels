import React from "react";
import { cn } from "@shared/lib/cn";
import { Badge } from "../badge/Badge";

export interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  subtitle,
  centered = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "space-y-3 max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {badgeText && (
        <Badge variant="gold" className="text-xs uppercase tracking-wider">
          {badgeText}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
