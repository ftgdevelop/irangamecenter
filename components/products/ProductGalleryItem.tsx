import type { ProductGalleryItem as ProductGalleryItemType } from '@/types/commerce';
import React, { RefObject, useState, useMemo } from 'react';
import Image from 'next/image';
import SteamStylePlayer from './SteamStylePlayer';

interface Props {
  item: ProductGalleryItemType;
  playersRef: RefObject<Map<string, HTMLVideoElement>>;
  isActive?: boolean;
  onClick?: () => void;
  isFullscreen?: boolean;
}

const Loader: React.FC = () => (
  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/10">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-500" />
  </div>
);

const ProductGalleryItem: React.FC<Props> = ({
  item,
  playersRef,
  isActive = false,
  onClick,
  isFullscreen = false,
}) => {
  const [loading, setLoading] = useState(true);

  const isVideo = useMemo(() => item.mediaType === 'Video', [item]);
  const isImage = useMemo(() => !!item.filePath?.includes('images'), [item]);

  const handleLoad = () => setLoading(false);

  const renderVideo = () =>
    item.cdnThumbnail && (
      <SteamStylePlayer
        src={item.cdnPath || item.filePath || ''}
        thumbnail={item.cdnThumbnail}
        itemId={item.id}
        playersRef={playersRef}
        isActive={isActive}
        onLoaded={handleLoad}
      />
    );

  const renderImage = () => (
    <div className="w-full h-full flex justify-center items-center rounded-xl bg-black">
      <div
        className={`relative rounded-xl overflow-hidden w-full h-full ${
          isFullscreen ? ' max-w-[800px] max-h-[450px] aspect-[16/9]' : ''
        }`}
      >
        <Image
          src={item.filePath || ''}
          alt={`gallery-image-${item.id}`}
          fill
          className={`h-full w-[327px] ${
            isFullscreen ? 'object-contain' : 'object-cover'
          } transition-transform`}
          onLoad={handleLoad}
          onError={handleLoad}
        />
      </div>
    </div>
  );

  if (isVideo && item.cdnThumbnail) {
    return (
      <div className="relative aspect-video h-full w-full cursor-pointer overflow-hidden rounded-xl shadow">
        {loading && <Loader />}
        {renderVideo()}

        {!isFullscreen && (
          <div
            className="absolute left-0 top-0 h-[calc(100%-75px)] w-full bg-transparent"
            onClick={onClick}
          />
        )}
      </div>
    );
  }

  if (isImage && item.filePath) {
    return (
      <div
        className="relative h-full w-full cursor-pointer rounded-xl"
        onClick={isFullscreen ? undefined : onClick}
      >
        {loading && <Loader />}
        {renderImage()}
      </div>
    );
  }

  return (
    <p className="rounded-xl text-sm text-red-500">
      فرمت پشتیبانی نشده: {item.cdnPath ?? 'Unknown'}
    </p>
  );
};

export default ProductGalleryItem;
