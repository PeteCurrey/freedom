"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GSAPInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Global GSAP settings
    gsap.config({
      nullTargetWarn: false,
    });

    // Default ScrollTrigger settings
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Final refresh to ensure all pins are settled after hydration
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
