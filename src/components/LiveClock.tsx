import React, { useState, useEffect } from 'react';

interface LiveClockProps {
  className?: string;
}

export const LiveClock: React.FC<LiveClockProps> = ({ className = 'text-xs font-mono text-[#8A867E]' }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false }));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeStr) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 tabular-nums ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#3F5E45] inline-block animate-pulse shrink-0"></span>
      <span>JAIPUR {timeStr} IST</span>
    </span>
  );
};
