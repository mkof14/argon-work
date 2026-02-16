"use client";

type EventPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: EventPayload) => void;
    plausible?: (eventName: string, options?: { props?: EventPayload }) => void;
  }
}

export function trackEvent(eventName: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, payload);
  window.plausible?.(eventName, { props: payload });
}
