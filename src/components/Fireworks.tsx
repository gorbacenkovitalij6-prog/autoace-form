'use client';

import { useEffect, useState } from 'react';

interface FireworksProps {
  show: boolean;
  onComplete?: () => void;
}

export default function Fireworks({ show, onComplete }: FireworksProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (show) {
      // Создаём несколько залпов фейерверков
      const fireworksData = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60, // разброс по ширине экрана
        y: 20 + Math.random() * 40, // разброс по высоте
        color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffd700'][
          Math.floor(Math.random() * 7)
        ],
        delay: Math.random() * 2,
      }));
      setParticles(fireworksData);

      // Убираем фейерверк через 4 секунды
      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          {/* Центральная вспышка */}
          <div
            className="absolute w-4 h-4 rounded-full animate-ping"
            style={{
              backgroundColor: particle.color,
              boxShadow: `0 0 20px ${particle.color}`,
            }}
          />
          {/* Искры во все стороны */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="firework-particle"
              style={{
                '--angle': `${(i * 30)}deg`,
                '--color': particle.color,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
