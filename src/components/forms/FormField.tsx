import React from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required = false,
  children,
  hint,
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-slate-200 flex items-center justify-between">
        <span>
          {label} {required && <span className="text-[#D4AF37]">*</span>}
        </span>
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
      {error && (
        <p className="text-xs font-semibold text-rose-400 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  );
};
