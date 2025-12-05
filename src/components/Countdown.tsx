'use client';

import { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newYear = new Date(now.getFullYear() + 1, 0, 1);
      const difference = newYear.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
      <div className="text-center bg-red-600/30 rounded-xl px-4 py-4 border-2 border-yellow-400/40">
        <div className="text-4xl font-bold text-white drop-shadow-xl" style={{
          textShadow: '0 0 15px rgba(255,215,0,1)'
        }}>
          {timeLeft.days}
        </div>
        <div className="text-sm text-yellow-200 font-semibold mt-1">дней</div>
      </div>
      <div className="text-center bg-green-600/30 rounded-xl px-4 py-4 border-2 border-yellow-400/40">
        <div className="text-4xl font-bold text-white drop-shadow-xl" style={{
          textShadow: '0 0 15px rgba(255,215,0,1)'
        }}>
          {timeLeft.hours}
        </div>
        <div className="text-sm text-yellow-200 font-semibold mt-1">часов</div>
      </div>
      <div className="text-center bg-blue-600/30 rounded-xl px-4 py-4 border-2 border-yellow-400/40">
        <div className="text-4xl font-bold text-white drop-shadow-xl" style={{
          textShadow: '0 0 15px rgba(255,215,0,1)'
        }}>
          {timeLeft.minutes}
        </div>
        <div className="text-sm text-yellow-200 font-semibold mt-1">минут</div>
      </div>
      <div className="text-center bg-purple-600/30 rounded-xl px-4 py-4 border-2 border-yellow-400/40">
        <div className="text-4xl font-bold text-white drop-shadow-xl" style={{
          textShadow: '0 0 15px rgba(255,215,0,1)'
        }}>
          {timeLeft.seconds}
        </div>
        <div className="text-sm text-yellow-200 font-semibold mt-1">секунд</div>
      </div>
    </div>
  );
}
