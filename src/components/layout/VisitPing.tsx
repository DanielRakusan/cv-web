"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

export function VisitPing() {
  useEffect(() => {
    if (!siteConfig.renderApiUrl) return;
    fetch(`${siteConfig.renderApiUrl}/health`, { method: "GET" }).catch(() => {});
  }, []);

  return null;
}
