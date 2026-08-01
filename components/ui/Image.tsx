import { clsx } from 'clsx';
import NextImage from 'next/image';

import type { ImageProps as NextImageProps } from 'next/image';

export interface ImageProps extends Omit<NextImageProps, 'src'> {
  src: string;
}

const Image = (props: ImageProps) => {
  const { alt, src, loading = 'lazy', style, className, quality = 75, ...rest } = props;

  return (
    <div className={clsx('image-container relative overflow-hidden', className)}>
      <NextImage
        className="object-center"
        src={src}
        alt={alt}
        style={{ objectFit: 'cover', ...style }}
        loading={loading}
        quality={quality}
        {...rest}
      />
    </div>
  );
};

export default Image;
