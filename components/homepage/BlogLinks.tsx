import Link from '@/components/ui/Link';
import Twemoji from '@/components/ui/Twemoji';
import GrowingUnderline from '@/components/ui/GrowingUnderline';

const BlogLinks = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col space-y-1.5">
        <Link href="/blog/tech" className="flex items-center">
          <Twemoji emoji="laptop" />
          <GrowingUnderline>
            <span data-umami-event="home-link-tech" className="ml-1.5">
              我的技术分享 ～务必多多指正🙈
            </span>
          </GrowingUnderline>
        </Link>
        <Link href="/blog/life" className="flex items-center">
          <Twemoji emoji="seedling" />
          <GrowingUnderline>
            <span data-umami-event="home-link-life" className="ml-1.5">
              生活中的思考 ～听听我的成长烦恼😎
            </span>
          </GrowingUnderline>
        </Link>
        <Link href="/blog/essay" className="flex items-center">
          <Twemoji emoji="memo" />
          <GrowingUnderline>
            {' '}
            <span data-umami-event="home-link-essay" className="ml-1.5">
              随手写点什么 ～随时报备哦🥰
            </span>
          </GrowingUnderline>
        </Link>
        <Link href="/lab" className="flex items-center">
          <Twemoji emoji="test-tube" />
          <GrowingUnderline>
            <span data-umami-event="home-link-lab" className="ml-1.5">
              我的实验室 ～奇妙小想法💭
            </span>
          </GrowingUnderline>
        </Link>
      </div>
    </div>
  );
};

export default BlogLinks;
