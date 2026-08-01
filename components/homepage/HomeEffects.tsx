'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false });

export default function HomeEffects() {
  const [showSnowfall, setShowSnowfall] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateVisibility = () => setShowSnowfall(window.innerWidth >= 768 && !reducedMotion.matches);

    updateVisibility();
    window.addEventListener('resize', updateVisibility, { passive: true });
    reducedMotion.addEventListener('change', updateVisibility);

    return () => {
      window.removeEventListener('resize', updateVisibility);
      reducedMotion.removeEventListener('change', updateVisibility);
    };
  }, []);

  if (!showSnowfall) {
    return null;
  }

  return (
    <Snowfall
      snowflakeCount={80}
      speed={[0.4, 2]}
      wind={[-0.2, 0.4]}
      radius={[0.5, 2]}
      opacity={[0.15, 0.4]}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}
