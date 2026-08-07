import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { motion, AnimatePresence } from "@shared/lib/motion";
import { IconButton } from "../icon-button/IconButton";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = "right",
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

  const slideVariants = {
    closed: { x: position === "right" ? "100%" : "-100%" },
    open: { x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={slideVariants}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "relative z-10 flex h-full w-full max-w-md flex-col bg-neutral-900 text-neutral-100 p-6 shadow-2xl border-l border-neutral-800",
              position === "left" && "mr-auto border-r border-l-0",
              position === "right" && "ml-auto",
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              {title && (
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              )}
              <IconButton
                icon={<X className="h-5 w-5" />}
                aria-label="Close drawer"
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-auto text-neutral-400 hover:text-white"
              />
            </div>

            <div className="flex-1 overflow-y-auto pt-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
