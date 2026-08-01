import Twemoji from '@/components/ui/Twemoji';

const Heading = () => {
  return (
    <div className="font-medium text-neutral-900 dark:text-neutral-200">
      <h1>
        我是赵康，也叫 <span>Juanlou（卷娄）</span>。
        <span className="absolute ml-1.5 inline-flex pt-[3px]">
          <Twemoji emoji="china-flag" />
        </span>
      </h1>
      <p>
        知其卷娄之患，故守其 <span>不卷不娄</span> 之身。
      </p>
    </div>
  );
};

export default Heading;
