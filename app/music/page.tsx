import MusicPlayer from '@/components/music/MusicPlayer';
import { genPageMetadata } from '@/lib/seo';

export const metadata = genPageMetadata({
  title: '音乐',
  description: '一张轻音乐合集，陪你读文章，也陪你慢下来。',
  path: '/music',
});

export default function MusicPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-3 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-6xl dark:text-gray-100">
          音乐
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">留一点时间，听一首歌。</p>
      </div>
      <MusicPlayer />
    </div>
  );
}
