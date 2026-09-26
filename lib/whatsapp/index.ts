import { Service, Offer, Problem } from "../../types";
import { normaliseReg } from "../vehicle";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447999200655";
}

export function buildWhatsAppUrl(message?: string): string {
  const number = getWhatsAppNumber();
  const url = new URL(`https://wa.me/${number}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}

export function getPhoneUrl(): string {
  return `tel:+${getWhatsAppNumber()}`;
}

type MessageProps = {
  service?: Service;
  offer?: Offer;
  problem?: Problem;
  reg?: string;
};

export function getWhatsAppMessage({ service, offer, problem, reg }: MessageProps): string {
  let msg = "Hi Revved, I'd like a quote.";
  
  if (problem && problem.whatsappMessage) {
    msg = problem.whatsappMessage;
  } else if (offer && offer.whatsappMessage) {
    msg = offer.whatsappMessage;
  } else if (service) {
    if (service.whatsappMessage) {
      msg = service.whatsappMessage;
    } else {
      msg = `Hi Revved, I'd like a quote for ${service.name}.`;
    }
  }

  const regString = reg ? normaliseReg(reg) : "______";
  
  if (msg.includes("______")) {
    msg = msg.replace("______", regString);
  } else {
    // If the message doesn't have a blank but we want to append reg
    if (!msg.includes("My registration is")) {
      msg += ` My registration is ${regString}.`;
    } else if (reg) {
        msg = msg.replace(/My registration is [A-Za-z0-9_ -]*/, `My registration is ${regString}.`);
    }
  }
  
  return msg;
}
