import { forwardRef } from "react";
import { MessageCircle } from "lucide-react";
import {
  createWhatsAppInquiryUrl,
  type WhatsAppInquiryOptions,
} from "@shared/services/whatsapp.service";
import { Button, type ButtonProps } from "../button/Button";

export interface WhatsAppButtonProps
  extends Omit<ButtonProps, "leftIcon">, WhatsAppInquiryOptions {
  label?: string;
}

export const WhatsAppButton = forwardRef<
  HTMLButtonElement,
  WhatsAppButtonProps
>(
  (
    {
      label = "WhatsApp Inquiry",
      vehicleName,
      pickupLocation,
      destination,
      pickupDate,
      passengers,
      customMessage,
      ...props
    },
    ref,
  ) => {
    const url = createWhatsAppInquiryUrl({
      vehicleName,
      pickupLocation,
      destination,
      pickupDate,
      passengers,
      customMessage,
    });

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <Button
          ref={ref}
          variant="primary"
          leftIcon={<MessageCircle className="h-4 w-4" />}
          {...props}
        >
          {label}
        </Button>
      </a>
    );
  },
);

WhatsAppButton.displayName = "WhatsAppButton";
