'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

const ThreeDCardDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { width, height, x, y } = ref.current.getBoundingClientRect();
    const mouseX = Math.abs(clientX - x);
    const mouseY = Math.abs(clientY - y);

    const rotateX = (mouseY / height - 0.5) * 30;
    const rotateY = (mouseX / width - 0.5) * -30;

    setStyle({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  }, []);

  useEffect(() => {
    const { current } = ref;
    if (!current) return;

    current.addEventListener('mousemove', onMouseMove);
    current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (!current) return;
      current.removeEventListener('mousemove', onMouseMove);
      current.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseLeave, onMouseMove]);

  return (
    <div className="inline-block" style={{ perspective: '1000px' }} ref={ref}>
      <div
        style={style}
        className="h-80 w-64 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-6 shadow-2xl transition-transform duration-200 ease-out"
      >
        <div className="flex h-full flex-col justify-between text-white">
          <div>
            <h3 className="mb-2 text-2xl font-bold">3D Card</h3>
            <p className="text-sm opacity-90">移动鼠标体验 3D 旋转效果</p>
          </div>
          <div className="space-y-2">
            <div className="h-2 w-full rounded-full bg-white/30"></div>
            <div className="h-2 w-3/4 rounded-full bg-white/30"></div>
            <div className="h-2 w-1/2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDCardDemo;
