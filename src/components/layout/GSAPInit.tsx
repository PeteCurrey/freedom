"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GSAPInit() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Global GSAP settings
    gsap.config({
      nullTargetWarn: false,
    });

    // Default ScrollTrigger settings
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });

    // Final refresh to ensure all pins are settled
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
