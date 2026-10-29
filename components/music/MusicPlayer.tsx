'use client';

import { useEffect, useRef, useState } from 'react';
import { Headphones, LoaderCircle, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import Button from '@/components/ui/Button';

type Track = { id: string; name: string; artist: string; album: string; duration: number };
type Collection = { name: string; tracks: Track[] };
const messages: Record<string, string> = {
  CREDENTIALS_EXPIRED: '音乐服务的登录凭据已失效，等待管理员重新登录。你无需登录账号。',
  NOT_CONFIGURED: '音乐合集暂未准备好，请稍后再来。',
  UNPLAYABLE: '这首歌暂时无法播放，请选择其他歌曲。',
  TRACK_NOT_IN_COLLECTION: '这首歌已不在合集中，请刷新列表。',
  RATE_LIMITED: '请求有些频繁，请稍后再试。',
};
const message = (code?: string) => messages[code || ''] || '音乐服务暂时无法连接，请稍后重试。';
const duration = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export default function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const requestNumber = useRef(0);
  const [collection, setCollection] = useState<Collection>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<number>();
  const current = selected === undefined ? undefined : collection?.tracks[selected];

  async function load(signal?: AbortSignal) {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/music/collection', { signal, cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(message(data.code));
      setCollection(data);
    } catch (cause) {
      if (!signal?.aborted) setError(cause instanceof Error ? cause.message : message());
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    void load(controller.signal);
    return () => {
      controller.abort();
      // This ref is a request sequence, not a DOM node; invalidate pending selections on unmount.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      requestNumber.current++;
    };
  }, []);

  async function select(index: number) {
    const track = collection?.tracks[index];
    if (!track || !audio.current) return;
    const request = ++requestNumber.current;
    audio.current.pause();
    audio.current.removeAttribute('src');
    audio.current.load();
    setSelected(index);
    setPending(true);
    setError('');
    try {
      const response = await fetch(`/api/music/tracks/${track.id}/play`, { cache: 'no-store' });
      const data = await response.json();
      if (request !== requestNumber.current) return;
      if (!response.ok) throw new Error(message(data.code));
      audio.current.src = `/api/music/tracks/${track.id}/audio`;
      try {
        await audio.current.play();
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === 'NotAllowedError') setError('歌曲已准备好，请点击播放。');
        else throw new Error(messages.UNPLAYABLE);
      }
    } catch (cause) {
      if (request === requestNumber.current) setError(cause instanceof Error ? cause.message : message());
    } finally {
      if (request === requestNumber.current) setPending(false);
    }
  }
  async function toggle() {
    if (!audio.current || !collection?.tracks.length) return;
    if (!current || !audio.current.getAttribute('src')) return select(selected ?? 0);
    if (playing) audio.current.pause();
    else {
      try {
        await audio.current.play();
        setError('');
      } catch {
        setError(messages.UNPLAYABLE);
      }
    }
  }
  async function playbackError() {
    if (!current) return;
    const request = requestNumber.current;
    setPending(false);
    setPlaying(false);
    setError(messages.UNPLAYABLE);
    try {
      const response = await fetch(`/api/music/tracks/${current.id}/play`, { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok && request === requestNumber.current) setError(message(data.code));
    } catch {
      /* Keep the playback error visible. */
    }
  }

  return (
    <section className="space-y-6 py-8" aria-label="音乐播放器" aria-busy={loading}>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-8 dark:border-gray-700 dark:bg-gray-900/40">
        <div className="flex items-start gap-4">
          <div className="dark:bg-primary-600 rounded-xl bg-gray-200 p-4" aria-hidden="true">
            <Headphones className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs tracking-widest text-gray-500 dark:text-gray-400">FOLIA · 一起听</p>
            <h2 className="text-2xl font-bold">{collection?.name || '轻音乐'}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {collection
                ? `${collection.tracks.length} 首歌曲 · 无需登录`
                : loading
                  ? '正在连接音乐服务'
                  : '音乐服务暂不可用'}
            </p>
          </div>
        </div>
        <div className="mt-7 min-h-14" aria-live="polite">
          <p className="font-medium break-words">{current?.name || '选一首喜欢的，慢慢听。'}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{current?.artist || '来自我的轻音乐合集'}</p>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            aria-label="上一首"
            disabled={pending || selected === undefined || selected === 0}
            onClick={() => void select((selected ?? 0) - 1)}
            className="min-h-11 disabled:opacity-40"
          >
            <SkipBack size={18} />
          </Button>
          <Button
            aria-label={playing ? '暂停' : '播放'}
            disabled={pending || !collection?.tracks.length}
            onClick={() => void toggle()}
            className="min-h-11 min-w-24 justify-center disabled:opacity-40"
          >
            {pending ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : playing ? (
              <Pause size={18} />
            ) : (
              <Play size={18} />
            )}
            {pending ? '加载中' : playing ? '暂停' : '播放'}
          </Button>
          <Button
            aria-label="下一首"
            disabled={pending || !collection?.tracks.length || (selected ?? -1) >= (collection?.tracks.length ?? 0) - 1}
            onClick={() => void select((selected ?? -1) + 1)}
            className="min-h-11 disabled:opacity-40"
          >
            <SkipForward size={18} />
          </Button>
        </div>
        <audio
          ref={audio}
          controls
          preload="none"
          aria-label="播放进度与音量"
          className="mt-5 w-full"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => void playbackError()}
          onEnded={() => {
            setPlaying(false);
            if (selected !== undefined && selected + 1 < (collection?.tracks.length ?? 0)) void select(selected + 1);
          }}
        />
      </div>
      {error && (
        <div role="alert" className="space-y-3 rounded-xl border border-amber-300 p-4 text-sm dark:border-amber-800">
          <p>{error}</p>
          {!collection && <Button onClick={() => void load()}>重新连接</Button>}
        </div>
      )}
      {loading ? (
        <p role="status" className="text-gray-500">
          正在加载合集…
        </p>
      ) : collection?.tracks.length === 0 ? (
        <p role="status" className="rounded-xl border border-gray-200 p-6 dark:border-gray-700">
          这张合集还没有歌曲，过些时候再来听听。
        </p>
      ) : (
        collection && (
          <ol className="divide-y divide-gray-200 dark:divide-gray-700" aria-label="合集曲目">
            {collection.tracks.map((track, index) => (
              <li key={track.id}>
                <Button
                  onClick={() => void select(index)}
                  aria-label={`播放 ${track.name}`}
                  aria-current={selected === index ? 'true' : undefined}
                  className={`w-full gap-3 rounded-none border-0 bg-transparent px-2 py-4 text-left shadow-none sm:gap-5 dark:bg-transparent ${selected === index ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                >
                  <span className="w-6 shrink-0 text-center text-xs text-gray-500" aria-hidden="true">
                    {selected === index && playing ? '♫' : String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-words">{track.name}</span>
                    <span className="mt-1 block text-xs font-normal text-gray-500 dark:text-gray-400">
                      {track.artist}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs font-normal text-gray-500">{duration(track.duration)}</span>
                </Button>
              </li>
            ))}
          </ol>
        )
      )}
    </section>
  );
}
