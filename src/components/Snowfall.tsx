'use client';

import { useEffect, useState } from 'react';

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{
    id: number;
    left: number;
    duration: number;
    delay: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 40 }, (_, i) => {
      const size = 0.5 + Math.random() * 1.5; // размер от 0.5 до 2
      return {
        id: i,
        left: Math.random() * 100,
        duration: 8 + Math.random() * 15,
        delay: Math.random() * 8,
        size: size,
        opacity: 0.3 + Math.random() * 0.7, // прозрачность от 0.3 до 1
      };
    });
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            fontSize: `${flake.size}em`,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
