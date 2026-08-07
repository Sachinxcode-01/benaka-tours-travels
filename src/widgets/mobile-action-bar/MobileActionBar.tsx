import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { createTelUrl } from "@shared/services/phone.service";
import { createWhatsAppInquiryUrl } from "@shared/services/whatsapp.service";
import { Button } from "@shared/ui/button";

export const MobileActionBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between gap-3 border-t border-neutral-800 bg-neutral-950/95 p-3 backdrop-blur-md md:hidden">
      <a href={createTelUrl()} className="w-1/2">
        <Button
          variant="outline"
          size="md"
          fullWidth
          leftIcon={<Phone className="h-4 w-4" />}
        >
          Call Now
        </Button>
      </a>
      <a
        href={createWhatsAppInquiryUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2"
      >
        <Button
          variant="primary"
          size="md"
          fullWidth
          leftIcon={<MessageCircle className="h-4 w-4" />}
        >
          WhatsApp
        </Button>
      </a>
    </div>
  );
};
