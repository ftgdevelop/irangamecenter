import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import React from "react";
import Image from "next/image";
import { Play } from "lucide-react"; // ✅ lightweight icon

interface Props {
  item: ProductGalleryItemType;
}

const ProductGalleryThumbnail: React.FC<Props> = ({ item }) => {
  const isVideo = item.mediaType === "Video";
  const isImage = item.filePath?.includes("images");

  return (
    <div className="relative w-16 h-16 box-border cursor-pointer group">
      {isVideo && item.cdnThumbnail ? (
        <>
          <Image
            src={item.cdnThumbnail}
            alt="Gallery video thumbnail"
            fill
            className="object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md ">
            <Play className="w-6 h-6 text-white drop-shadow-md" />
          </div>
        </>
      ) : isImage && item.filePath ? (
        <Image
          src={item.filePath}
          alt="Gallery image"
          fill
          className="object-cover rounded-md"
        />
      ) : (
        <p className="text-xs text-red-500 p-1">
          فرمت پشتیبانی نشده: {item.cdnPath ?? "Unknown"}
        </p>
      )}
    </div>
  );
};

export default ProductGalleryThumbnail;
