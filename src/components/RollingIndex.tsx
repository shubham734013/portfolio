import React, { useEffect, useState, useRef } from 'react';

interface RollingIndexProps {
  numberStr: string; // e.g. "01", "02", "05"
  prefix?: string; // e.g. "[ "
  suffix?: string; // e.g. " ]"
  className?: string;
}

export const RollingIndex: React.FC<RollingIndexProps> = ({
  numberStr,
  prefix = '[ ',
  suffix = ' ]',
  className = 'text-[#D84A27] font-bold font-mono text-xs',
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const digits = numberStr.split('');

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center select-none font-mono tracking-wider ${className}`}
      aria-label={`${prefix}${numberStr}${suffix}`}
    >
      <span aria-hidden="true" className="opacity-70">{prefix}</span>
      {digits.map((digitChar, i) => {
        const targetDigit = parseInt(digitChar, 10);
        const isNum = !isNaN(targetDigit);

        if (!isNum) {
          return <span key={i}>{digitChar}</span>;
        }

        return (
          <span
            key={i}
            className="inline-block relative overflow-hidden h-[1.3em] w-[0.68em] align-middle"
            aria-hidden="true"
          >
            <span
              className="flex flex-col transition-transform duration-800 cubic-bezier(0.16,1,0.3,1)"
              style={{
                transform: hasAnimated ? `translateY(-${targetDigit * 10}%)` : 'translateY(0%)',
              }}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <span
                  key={num}
                  className="h-[1.3em] flex items-center justify-center leading-none"
                >
                  {num}
                </span>
              ))}
            </span>
          </span>
        );
      })}
      <span aria-hidden="true" className="opacity-70">{suffix}</span>
    </span>
  );
};
