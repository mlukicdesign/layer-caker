"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { SITE_SETTINGS_QUERYResult } from "@/sanity/types";

// Use the generated types from the Sanity schema
type SiteSettingsContextType = SITE_SETTINGS_QUERYResult;

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(
  undefined
);
SiteSettingsContext.displayName = "SiteSettingsContext";

export function SiteSettingsProvider({
  value,
  children,
}: {
  value: SiteSettingsContextType;
  children: ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (context === undefined)
    throw new Error(
      "useSiteSettings must be used within a SiteSettingsProvider"
    );
  return context;
}
