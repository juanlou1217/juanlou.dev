import React, { useCallback, useEffect, useRef, useState } from 'react';

import Image from '@/components/ui/Image';
import ProfileInfo from '@/components/homepage/ProfileInfo';

const ProfileCard = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current || window.innerWidth < 1280) return;

    const { clientX, clientY } = e;
    const { width, height, x, y } = ref.current.getBoundingClientRect();
    const mouseX = Math.abs(clientX - x);
    const mouseY = Math.abs(clientY - y);
    const rotateMin = -15;
    const rotateMax = 15;
    const rotateRange = rotateMax - rotateMin;

    const rotate = {
      x: rotateMax - (mouseY / height) * rotateRange,
      y: rotateMin + (mouseX / width) * rotateRange,
    };

    setStyle({
      transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
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
    <div
      className="z-10 hidden scale-100 transition-all duration-200 ease-out hover:z-40 hover:scale-[1.11] xl:block"
      style={{ perspective: '600px' }}
      ref={ref}
    >
      <div
        style={style}
        className="overflow-hidden rounded-sm shadow-lg shadow-slate-300 transition-all duration-200 ease-out dark:shadow-sky-700/50"
      >
        <div style={style} className="max-h-[430px] overflow-hidden rounded-md transition-all duration-200 ease-out">
          <Image src={'/static/images/avatar_backup.jpg'} alt="avatar" width={430} height={430} />
        </div>
        <ProfileInfo />
        <div className="h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
