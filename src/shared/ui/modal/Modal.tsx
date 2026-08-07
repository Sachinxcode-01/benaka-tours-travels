import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { motion, AnimatePresence } from "@shared/lib/motion";
import { IconButton } from "../icon-button/IconButton";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-100 shadow-xl",
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              {title && (
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              )}
              <IconButton
                icon={<X className="h-5 w-5" />}
                aria-label="Close modal"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-auto text-neutral-400 hover:text-white"
              />
            </div>

            <div className="pt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
