import { memo } from 'react';
import type { SyntheticEvent } from 'react';
import Image, { ImageProps } from 'next/image';
import { 기본_이미지_소스, 기본_프로필_이미지 } from '@/constants';

const handleBrokenImage = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  const $target = event.target as HTMLImageElement;
  $target.src = 기본_프로필_이미지;
};

const CustomImage = ({ src, alt, className, ...rest }: ImageProps) => (
  <Image
    data-sizes="auto"
    data-src={src}
    src={기본_이미지_소스}
    alt={alt}
    className={className ? `${className} lazyload` : `lazyload`}
    onError={handleBrokenImage}
    width={50}
    height={50}
    {...rest}
  />
);

export default memo(CustomImage);
