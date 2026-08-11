import React from "react";
import { Header } from "../header";
import { Footer } from "../footer";
import { MobileActionBar } from "../mobile-action-bar";
import { ChatLauncher } from "@features/chatbot";

export interface PageShellProps {
  children: React.ReactNode;
}

export const PageShell: React.FC<PageShellProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#07080B] text-slate-100 selection:bg-amber-500/30 selection:text-amber-300">
      {/* Background Ambient Radial Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-radial-gold opacity-60 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-radial-navy opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
        <ChatLauncher />
      </div>
    </div>
  );
};
