import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Hls, { Events, ErrorTypes, ErrorDetails, type Level } from "hls.js";

interface Props {
  item: ProductGalleryItemType;
  playersRef: RefObject<Map<string, HTMLVideoElement>>;
  isActive: boolean;
}

const ProductGalleryItem: React.FC<Props> = ({
  item,
  playersRef,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(-1);

  useEffect(() => {
    const video = videoRef.current;
    if (
      !video ||
      !item.cdnPath ||
      !item.cdnPath.includes("video") ||
      item.mediaType !== "Video"
    ) {
      return;
    }

    const isHLS = item.cdnPath.endsWith(".m3u8");
    const sourceUrl = isHLS ? item.cdnPath : item.filePath ?? "";

    if (isHLS && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: true,
        autoStartLoad: true,
        maxBufferLength: 60,
        maxBufferHole: 0.5,
      });

      hls.loadSource(sourceUrl);
      hls.attachMedia(video);

      hls.on(Events.MANIFEST_PARSED, () => {
        setLevels([...hls.levels]);
        setCurrentLevel(-1);
        playersRef.current?.set(String(item.id), video);
      });

      hls.on(Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level);
      });

      hls.on(Events.ERROR, (_, data) => {
        const { type, details, fatal } = data;
        console.warn("HLS.js error:", type, details, data);

        if (fatal) {
          switch (type) {
            case ErrorTypes.NETWORK_ERROR:
              console.log("Recovering from network error...");
              hls.startLoad();
              break;
            case ErrorTypes.MEDIA_ERROR:
              console.log("Recovering from media error...");
              hls.recoverMediaError();
              break;
            default:
              console.log("Destroying HLS instance due to fatal error");
              hls.destroy();
              break;
          }
        } else if (details === ErrorDetails.BUFFER_STALLED_ERROR) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        }
      });

      hlsRef.current = hls;
    } else {
      video.src = sourceUrl;
      playersRef.current?.set(String(item.id), video);
    }

    return () => {
      playersRef.current?.delete(String(item.id));
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [item, playersRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || item.mediaType !== "Video") return;

    const playVideo = async () => {
      try {
        if (isActive && video.paused) {
          await video.play();
        } else if (!isActive && !video.paused) {
          video.pause();
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.warn("Autoplay failed:", err);
      }
    };

    const timeout = setTimeout(playVideo, 50);

    return () => clearTimeout(timeout);
  }, [isActive, item.mediaType]);

  const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const level = parseInt(e.target.value, 10);
    setCurrentLevel(level);
    if (hlsRef.current) {
      hlsRef.current.currentLevel = level;
    }
  };

  const isVideo = item.mediaType === "Video";
  const isImage = item.filePath?.includes("images");

  return (
    <div className="relative w-full aspect-video  overflow-hidden shadow">
      {isVideo ? (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={item.cdnThumbnail}
            controls
            playsInline
          />
          {levels.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
              <select
                value={currentLevel}
                onChange={handleQualityChange}
                className="bg-transparent text-white outline-none"
              >
                <option value={-1}>Auto</option>
                {levels.map((level, index) => (
                  <option key={index} value={index}>
                    {level.height ? `${level.height}p` : `Level ${index}`}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      ) : isImage && item.filePath ? (
        <Image
          src={item.filePath}
          alt="Gallery image"
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
