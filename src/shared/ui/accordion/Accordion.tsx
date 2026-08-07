import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@shared/lib/cn";
import { motion, AnimatePresence } from "@shared/lib/motion";

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm overflow-hidden transition-colors hover:border-neutral-700">
      <button
        type="button"
        id={`accordion-btn-${id}`}
        aria-controls={`accordion-panel-${id}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-amber-400 transition-transform duration-200 shrink-0 ml-3",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-300 border-t border-neutral-800/60 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export interface AccordionProps {
  items: Array<{ id: string; question: string; answer: string }>;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, idx) => (
        <AccordionItem key={item.id} {...item} defaultOpen={idx === 0} />
      ))}
    </div>
  );
};
