"use client";

import { useEffect } from "react";

export default function HomeClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Handle hash navigation from other pages
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Wait for hydration and layout
        setTimeout(() => {
          const id = hash.replace("#", "");
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleHashScroll();
  }, []);

  return <main>{children}</main>;
}

