import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { motion, AnimatePresence } from "@shared/lib/motion";
import { IconButton } from "../icon-button/IconButton";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  variant?: ToastVariant;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  onClose,
  title,
  message,
  variant = "info",
  duration = 4000,
}) => {
  useEffect(() => {
    if (!isOpen || duration <= 0) return;
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  const variantConfig = {
    success: {
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      border: "border-emerald-500/30",
    },
    error: {
      icon: <AlertCircle className="h-5 w-5 text-rose-400" />,
      border: "border-rose-500/30",
    },
    warning: {
      icon: <AlertCircle className="h-5 w-5 text-amber-400" />,
      border: "border-amber-500/30",
    },
    info: {
      icon: <Info className="h-5 w-5 text-sky-400" />,
      border: "border-sky-500/30",
    },
  };

  const current = variantConfig[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border bg-neutral-900/95 p-4 text-white shadow-2xl backdrop-blur-md",
            current.border,
          )}
        >
          <div className="shrink-0 pt-0.5">{current.icon}</div>
          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">{title}</h4>
            {message && <p className="text-xs text-neutral-300">{message}</p>}
          </div>
          <IconButton
            icon={<X className="h-4 w-4" />}
            aria-label="Dismiss notification"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-neutral-400 hover:text-white -mr-1 -mt-1"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
