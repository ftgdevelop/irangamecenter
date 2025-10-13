import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import React, { RefObject, useState } from "react";
import Image from "next/image";
import SteamStylePlayer from "./SteamStylePlayer";

interface Props {
  item: ProductGalleryItemType;
  playersRef: RefObject<Map<string, HTMLVideoElement>>;
  isActive?: boolean;
}

const ProductGalleryItem: React.FC<Props> = ({
  item,
  playersRef,
  isActive,
}) => {
  const [loading, setLoading] = useState(true);
  const isVideo = item.mediaType === "Video";
  const isImage = item.filePath?.includes("images");

  const Loader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin" />
    </div>
  );

  if (isVideo) {
    return (
      <div className="relative w-full aspect-video overflow-hidden h-full shadow">
        {loading && <Loader />}
        <SteamStylePlayer
          src={item.cdnPath || item.filePath || ""}
          thumbnail={item.cdnThumbnail}
          itemId={item.id}
          playersRef={playersRef}
          isActive={isActive}
          onLoaded={() => setLoading(false)}
        />
      </div>
    );
  }

  if (isImage && item.filePath) {
    return (
      <div className="relative w-full h-full">
        {loading && <Loader />}
        <Image
          src={item.filePath}
          alt="Gallery image"
          fill
          className="object-cover"
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </div>
    );
  }

  return (
    <p className="text-sm text-red-500">
      فرمت پشتیبانی نشده: {item.cdnPath ?? "Unknown"}
    </p>
  );
};

export default ProductGalleryItem;
