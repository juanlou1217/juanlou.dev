'use client';

import React from 'react';
import Typed from 'typed.js';

import Twemoji from '@/components/ui/Twemoji';

const TypedBios = () => {
  const el = React.useRef(null);
  const typed = React.useRef<Typed | null>(null);

  React.useEffect(() => {
    typed.current = new Typed(el.current, {
      stringsElement: '#bios',
      typeSpeed: 40,
      backSpeed: 10,
      loop: true,
      backDelay: 1000,
    });

    return () => typed.current?.destroy();
  }, []);

  return (
    <div>
      <ul id="bios" className="hidden">
        <li>从老家来到杭州闯一闯。</li>
        <li>不甘让生活成为一潭死水。</li>
        <li>相信先做再看胜过完美想象。</li>
        <li>
          对 <b className="font-medium">AI</b> 和 <b className="font-medium">3D 交互</b>很感兴趣。
        </li>
        <li>
          热爱 <b className="font-medium">样式开发</b>，也喜欢折腾新鲜玩意儿。
        </li>
        <li>
          喜欢打羽毛球 <Twemoji emoji="badminton" />
          ，听音乐 <Twemoji emoji="musical-keyboard" />。
        </li>
        <li>
          玩游戏是我的放松方式 <Twemoji emoji="video-game" />
          （鹅鸭杀玩家在此）。
        </li>
        <li>正在参与开源项目打磨能力。</li>
        <li>一直在折腾，一直在成长。</li>
        <li>
          远方不远，一步步走 <Twemoji emoji="airplane" />。
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;
