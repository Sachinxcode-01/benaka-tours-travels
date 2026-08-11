import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@shared/i18n/config";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
