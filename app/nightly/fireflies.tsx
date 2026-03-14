"use client";

import { useEffect, useState } from "react";

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  glowColor: string;
}

export function Fireflies() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate fireflies on mount (client-side only)
    const colors = ["#4ade80", "#86efac", "#a3e635", "#fde047"];
    const flies: Firefly[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: 3 + Math.random() * 94, // 3-97% of width
      y: 5 + Math.random() * 90, // 5-95% of height (full page scatter)
      size: 3 + Math.random() * 6, // 3-9px core size
      duration: 12 + Math.random() * 18, // 12-30s animation duration
      delay: Math.random() * 10, // 0-10s delay
      glowColor: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFireflies(flies);
  }, []);

  if (fireflies.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes drift1 {
          0% { transform: translate(0, 0); }
          10% { transform: translate(8px, -12px); }
          15% { transform: translate(25px, -8px); }
          25% { transform: translate(20px, -35px); }
          35% { transform: translate(-5px, -28px); }
          40% { transform: translate(-15px, -45px); }
          55% { transform: translate(10px, -38px); }
          65% { transform: translate(30px, -55px); }
          75% { transform: translate(15px, -40px); }
          85% { transform: translate(-10px, -20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift2 {
          0% { transform: translate(0, 0); }
          8% { transform: translate(-12px, -5px); }
          20% { transform: translate(-25px, -30px); }
          30% { transform: translate(-8px, -45px); }
          45% { transform: translate(15px, -35px); }
          55% { transform: translate(5px, -55px); }
          70% { transform: translate(-20px, -40px); }
          85% { transform: translate(-5px, -15px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift3 {
          0% { transform: translate(0, 0); }
          12% { transform: translate(18px, -20px); }
          22% { transform: translate(5px, -40px); }
          35% { transform: translate(-12px, -25px); }
          48% { transform: translate(-25px, -50px); }
          60% { transform: translate(-8px, -35px); }
          75% { transform: translate(20px, -45px); }
          88% { transform: translate(10px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.15; }
          5% { opacity: 0.8; }
          8% { opacity: 0.2; }
          12% { opacity: 0.9; }
          15% { opacity: 0.1; }
          45% { opacity: 0.1; }
          48% { opacity: 0.85; }
          52% { opacity: 0.7; }
          55% { opacity: 0.15; }
          80% { opacity: 0.1; }
          83% { opacity: 0.75; }
          86% { opacity: 0.2; }
        }
      `}</style>
      {fireflies.map((fly) => {
        const driftAnim = [`drift1`, `drift2`, `drift3`][fly.id % 3];
        const blinkDuration = 4 + (fly.id % 5); // 4-8s blink cycle
        return (
          <div
            key={fly.id}
            className="absolute"
            style={{
              left: `${fly.x}%`,
              top: `${fly.y}%`,
              animation: `${driftAnim} ${fly.duration}s ease-in-out infinite`,
              animationDelay: `${fly.delay}s`,
            }}
          >
            {/* Outer glow */}
            <div
              className="absolute rounded-full blur-md"
              style={{
                width: fly.size * 4,
                height: fly.size * 4,
                backgroundColor: fly.glowColor,
                left: -fly.size * 1.5,
                top: -fly.size * 1.5,
                animation: `blink ${blinkDuration}s ease-in-out infinite`,
                animationDelay: `${fly.delay * 0.7}s`,
              }}
            />
            {/* Inner core */}
            <div
              className="absolute rounded-full blur-sm"
              style={{
                width: fly.size,
                height: fly.size,
                backgroundColor: "white",
                animation: `blink ${blinkDuration}s ease-in-out infinite`,
                animationDelay: `${fly.delay * 0.7}s`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
