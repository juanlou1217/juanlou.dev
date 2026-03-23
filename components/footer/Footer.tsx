'use client';

import { useState } from 'react';
import BuildWith from '@/components/footer/BuildWith';

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear());

  return (
    <footer>
      <div className="mt-16 mb-8 items-center justify-between space-y-4 md:mb-10 md:flex md:space-y-0">
        <BuildWith />

        <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div suppressHydrationWarning>Copyright © {year}</div>
          <span>{` • `}</span>
          <span>卷娄的折腾日记</span>
        </div>
      </div>
    </footer>
  );
}
