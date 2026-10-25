import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ currentX: -100, currentY: -100, targetX: -100, targetY: -100 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasTouch || prefersReducedMotion) {
      setIsTouchDevice(true);
      return;
    }
    setIsTouchDevice(false);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Spring damping interpolation loop (Lovable/Linear silky smoothness)
    const animate = () => {
      const pos = posRef.current;
      const ease = 0.22; // smooth spring lag
      pos.currentX += (pos.targetX - pos.currentX) * ease;
      pos.currentY += (pos.targetY - pos.currentY) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.currentX}px, ${pos.currentY}px, 0) translate(-50%, -50%)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
      }}
    >
      <div
        className={`rounded-full border border-[#D84A27] transition-all duration-200 ease-out ${
          isPointer
            ? 'w-8 h-8 bg-[#D84A27]/20 scale-125'
            : 'w-2.5 h-2.5 bg-[#D84A27] scale-100'
        }`}
      />
    </div>
  );
};
