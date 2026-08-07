import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D12] text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-4 max-w-md">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]">
          404
        </h1>
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <p className="text-sm text-slate-400">
          The destination page you requested could not be located.
        </p>
        <Link to="/">
          <PrimaryButton icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Benaka Homepage
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};
