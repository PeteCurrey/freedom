"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
    
    function update(time: number) {
      if (!lenisRef.current?.lenis) return;
      lenisRef.current.lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  if (!isMounted) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
