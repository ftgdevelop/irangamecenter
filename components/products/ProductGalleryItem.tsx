import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import React, { RefObject } from "react";
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
  const isVideo = item.mediaType === "Video";
  const isImage = item.filePath?.includes("images");

  if (isVideo) {
    return (
      <div className="relative w-full aspect-video overflow-hidden h-full shadow">
        <SteamStylePlayer
          src={item.cdnPath || item.filePath || ""}
          thumbnail={item.cdnThumbnail}
          itemId={item.id}
          playersRef={playersRef}
          isActive={isActive}
        />
      </div>
    );
  }

  if (isImage && item.filePath) {
    return (
      <Image
        src={item.filePath}
        alt="Gallery image"
        fill
        className="object-cover"
      />
    );
  }

  return (
    <p className="text-sm text-red-500">
      فرمت پشتیبانی نشده: {item.cdnPath ?? "Unknown"}
    </p>
  );
};

export default ProductGalleryItem;
