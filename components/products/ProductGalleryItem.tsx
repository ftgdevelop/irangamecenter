import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import videojs, { Player } from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-hls-quality-selector";

declare module "video.js" {
  interface Player {
    hlsQualitySelector?: (options?: {
      displayCurrentQuality?: boolean;
    }) => void;
  }
}

interface Props {
  item: ProductGalleryItemType;
  playersRef: React.RefObject<Map<string, Player>>;
  isActive: boolean;
}

const ProductGalleryItem: React.FC<Props> = ({
  item,
  playersRef,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (
      !videoRef.current ||
      !item.cdnPath ||
      !item.cdnPath.includes("video") ||
      item.mediaType !== "Video"
    ) {
      return;
    }

    const isHLS = item.cdnPath.endsWith(".m3u8");
    const sourceType = isHLS ? "application/x-mpegURL" : "video/mp4";
    const sourceUrl = isHLS ? item.cdnPath : item.filePath ?? "";

    const player = videojs(
      videoRef.current,
      {
        controls: true,
        preload: "auto",
        fluid: true,
        poster: item.cdnThumbnail,
        muted: true,
        loop: true,
        sources: [{ src: sourceUrl, type: sourceType }],
      },
      () => {
        console.log("Player is ready");
        playersRef.current.set(String(item.id), player);
      },
    );

    playerRef.current = player;

    player.on("error", () => {
      console.error("Error in video player:", player.error());
    });

    return () => {
      if (playerRef.current) {
        playersRef.current.delete(String(item.id));
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [item, playersRef]);

  useEffect(() => {
    const player = playerRef.current;
    if (item.mediaType === "Video" && player) {
      if (isActive) {
        player?.play()?.catch(console.error);
      } else {
        player.pause();
      }
    }
  }, [isActive, item.id, item.mediaType]);

  const isVideo = item.cdnPath?.includes("video") && item.mediaType === "Video";
  const isImage = item.filePath?.includes("images");

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow">
      {isVideo ? (
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered w-full h-full object-cover"
          data-setup={JSON.stringify({
            controls: true,
            preload: "auto",
            fluid: true,
            poster: item.cdnThumbnail,
            muted: true,
            loop: true,
          })}
        />
      ) : isImage && item.filePath ? (
        <Image
          src={item.filePath}
          alt={"Gallery image"}
          fill
          className="object-cover"
        />
      ) : (
        <p className="text-sm text-red-500">
          فرمت پشتیبانی نشده: {item.cdnPath ?? "Unknown"}
        </p>
      )}
    </div>
  );
};

export default ProductGalleryItem;
