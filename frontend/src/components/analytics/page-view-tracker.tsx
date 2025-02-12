"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params: {
        event_category?: string;
        [key: string]: string | number | boolean | undefined;
      },
    ) => void;
  }
}

export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const hasTracked = sessionStorage.getItem(`tracked_${pathname}`);

    if (typeof window !== "undefined" && window.gtag && !hasTracked) {
      let pageTitle = "Recipes Page";
      switch (pathname) {
        case "/my-recipes":
          pageTitle = "My Recipes Page";
          break;
        case "/favorites":
          pageTitle = "Favorites Page";
          break;
        case "/profile":
          pageTitle = "Profile Page";
          break;
        case "/forgot-password":
          pageTitle = "Forgot Password Page";
          break;
        case "/session":
          pageTitle = "Session page";
          break;
      }

      window.gtag("event", "page_view", {
        event_category: "page_view",
        page_title: pageTitle,
        page_path: pathname,
      });

      sessionStorage.setItem(`tracked_${pathname}`, "true");
    }
  }, [pathname]);

  return null;
}
