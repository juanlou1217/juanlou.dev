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
        <li>相信判断、验证和表达，比单纯生成更重要。</li>
        <li>
          对 <b className="font-medium">AI 协作</b> 和 <b className="font-medium">前端体验</b>很感兴趣。
        </li>
        <li>
          热爱 <b className="font-medium">样式开发</b>，也喜欢将生活与项目梳理清楚。
        </li>
        <li>
          喜欢打羽毛球 <Twemoji emoji="badminton" />
          ，听音乐 <Twemoji emoji="musical-keyboard" />。
        </li>
        <li>
          玩游戏是我的放松方式 <Twemoji emoji="video-game" />
          （鹅鸭杀玩家在此）。
        </li>
        <li>正在参与真实项目，补自己的业务视角。</li>
        <li>一直在折腾，也在学习变得更稳。</li>
        <li>
          远方不远，一步步走 <Twemoji emoji="airplane" />。
        </li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  );
};

export default TypedBios;
