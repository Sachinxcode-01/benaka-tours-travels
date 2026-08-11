import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "hi", label: "हिंदी" },
] as const;

interface LanguageSelectorProps {
  compact?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  compact = false,
}) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#0F1219] border border-white/10">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${
              currentLang === lang.code
                ? "bg-[#D4AF37] text-black"
                : "text-slate-400 hover:text-white"
            }`}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={currentLang === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
        <Globe className="w-3.5 h-3.5" />
        Language
      </div>
      <div className="flex gap-2">
        {LANGUAGES.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => handleChange(lang.code)}
            whileTap={{ scale: 0.95 }}
            className={`py-2 px-3 rounded-xl text-sm font-semibold border transition-all ${
              currentLang === lang.code
                ? "bg-amber-500/15 border-[#D4AF37] text-[#D4AF37]"
                : "bg-[#0F1219] border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
            }`}
            aria-label={`Switch to ${lang.label}`}
            aria-pressed={currentLang === lang.code}
          >
            {lang.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
