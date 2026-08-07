import { forwardRef } from "react";
import { Phone } from "lucide-react";
import { createTelUrl } from "@shared/services/phone.service";
import { Button, type ButtonProps } from "../button/Button";

export interface CallButtonProps extends Omit<ButtonProps, "leftIcon"> {
  phoneNumber?: string;
  label?: string;
}

export const CallButton = forwardRef<HTMLButtonElement, CallButtonProps>(
  (
    { phoneNumber, label = "Call Us Now", variant = "outline", ...props },
    ref,
  ) => {
    const url = createTelUrl(phoneNumber);

    return (
      <a href={url} className="inline-block">
        <Button
          ref={ref}
          variant={variant}
          leftIcon={<Phone className="h-4 w-4" />}
          {...props}
        >
          {label}
        </Button>
      </a>
    );
  },
);

CallButton.displayName = "CallButton";
