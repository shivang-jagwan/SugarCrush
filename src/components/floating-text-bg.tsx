/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingElement {
  id: number;
  duration: number;
  delay: number;
  tx: number;
  ty: number;
  left: number;
}

export const FloatingTextBg = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Generate random floating text elements
    const generateElements = () => {
      const newElements: FloatingElement[] = [];
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          duration: 8 + Math.random() * 4, // 8-12 seconds
          delay: Math.random() * 2, // 0-2 seconds
          tx: (Math.random() - 0.5) * 600, // -300 to 300px horizontal
          ty: -800 - Math.random() * 400, // Move upward 800-1200px
          left: Math.random() * 100, // 0-100% horizontal
        });
      }
      setElements(newElements);
    };

    generateElements();

    // Regenerate elements periodically
    const interval = setInterval(generateElements, 12000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {elements.map((element) => (
        <div
          key={element.id}
          className={cn(
            "floating-text pointer-events-none fixed bottom-0 z-10 text-foreground/40"
          )}
          style={
            {
              left: `${element.left}%`,
              bottom: "-50px",
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
              "--tx": `${element.tx}px`,
              "--ty": `${element.ty}px`,
            } as React.CSSProperties & Record<string, unknown>
          }
        >
          🍰 SugarCrush 🍰
        </div>
      ))}
    </>
  );
};



