"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
import { Button, ButtonProps } from "./Button";

interface WhatsAppButtonProps extends Omit<ButtonProps, "href" | "onClick" | "external"> {
  message?: string;
  label?: string;
}

export function WhatsAppButton({ message, label = "WhatsApp Us", className, ...props }: WhatsAppButtonProps) {
  const handleClick = () => {
    trackEvent("whatsapp_click", { message });
  };

  const url = buildWhatsAppUrl(message);

  return (
    <Button
      href={url}
      external
      variant="primary"
      onClick={handleClick}
      className={className}
      {...props}
    >
      <MessageCircle className="w-5 h-5 mr-2" />
      {label}
    </Button>
  );
}
