import Twemoji from '@/components/ui/Twemoji';

const Heading = () => {
  return (
    <h1 className="font-medium text-neutral-900 dark:text-neutral-200">
      I'm <span>赵康</span>，知其卷娄之患，故守其 <span>不卷不娄</span> 之身。
      <span className="absolute ml-1.5 inline-flex pt-[3px]">
        <Twemoji emoji="china-flag" />
      </span>
    </h1>
  );
};

export default Heading;
