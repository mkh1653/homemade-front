"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PATH_NAMES } from "@/constants/pathnames";

const BreadcrumbsContext = createContext<
  { name: string; href: string }[] | undefined
>(undefined);

export const BreadcrumbsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const name = PATH_NAMES[href] || segment;
      return {
        name,
        href,
      };
    });
    setLinks(breadcrumbs);
  }, [pathname]);

  return (
    <BreadcrumbsContext.Provider value={links}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbsContext);
  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a BreadcrumbsProvider");
  }
  return context;
};
