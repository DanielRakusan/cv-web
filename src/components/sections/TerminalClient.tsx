"use client";

import dynamic from "next/dynamic";

const Terminal = dynamic(
  () => import("@/components/sections/Terminal").then(m => ({ default: m.Terminal })),
  { ssr: false }
);

export function TerminalClient() {
  return <Terminal />;
}
