import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate = "2026-11-14T09:00:00" }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 my-6">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-18 sm:w-20 sm:h-22 md:w-24 md:h-24 rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-xl shadow-brand-950/50 flex flex-col items-center justify-center p-2 backdrop-blur-sm group hover:border-brand-500/50 transition-colors">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 font-mono tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-brand-400 tracking-wider mt-1">
                {unit.label}
              </span>
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <span className="text-xl sm:text-2xl font-bold text-slate-600 mb-4 animate-pulse">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
