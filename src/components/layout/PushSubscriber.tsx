"use client";

import { usePushSubscription } from "@/hooks/usePushSubscription";

/**
 * Registruje Web Push subscription.
 * Aktivuje se automaticky pouze v PWA modu (přidáno na plochu).
 * Renderuje prázdný fragment — žádný UI.
 */
export function PushSubscriber() {
  usePushSubscription();
  return null;
}
