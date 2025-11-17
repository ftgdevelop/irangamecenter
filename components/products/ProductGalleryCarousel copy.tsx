import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useRef, useState } from "react";
import Carousel from "../shared/Carousel";
import ProductGalleryItem from "./ProductGalleryItem";

interface Props {
  galleries?: ProductGalleryItemType[];
}

const DEFAULT_IMAGE_DURATION = 200000;

function ProductGalleryCarouselCopy({ galleries = [] }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullScreen] = useState(false);

  const playersRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const emblaRef = useRef<EmblaCarouselType | null>(null);

  useEffect(() => {
    if (!galleries.length || isFullscreen || !emblaRef.current) return;

    const currentItem = galleries[currentSlide];
    if (!currentItem) return;

    let duration = DEFAULT_IMAGE_DURATION;

    if (currentItem.mediaType === "Video") {
      const video = playersRef.current.get(String(currentItem.id));

      if (video) {
        if (!video.duration || isNaN(video.duration)) {
          const handleLoaded = () => {
            const d = video.duration * 1000;
            setTimeout(() => emblaRef.current?.scrollNext(), d);
            video.removeEventListener("loadedmetadata", handleLoaded);
          };
          video.addEventListener("loadedmetadata", handleLoaded);
          return;
        } else {
          duration = video.duration * 1000;
        }
      }
    }

    const timeout = setTimeout(() => {
      emblaRef.current?.scrollNext();
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentSlide, galleries, isFullscreen]);


  useEffect(() => {
    const playerMap = playersRef.current;
    if (!playerMap.size || !emblaRef.current) return;

    const handleEnded = () => emblaRef.current?.scrollNext();

    playerMap.forEach((video) => video?.addEventListener("ended", handleEnded));

    return () => {
      playerMap.forEach((video) =>
        video?.removeEventListener("ended", handleEnded)
      );
    };
  }, [galleries, currentSlide]);


  useEffect(() => {
    const container = document.getElementById("gallery-fullscreen-container");
    if (!container) return;

    const el = container as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    if (isFullscreen) {
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }

    }
    }
  , [isFullscreen]);


  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  if (!galleries.length) return null;

  return (
    <div
      id="gallery-fullscreen-container"
      className={
        isFullscreen
          ? "fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          : "mb-5"
      }
    >
      {isFullscreen && (
        <button
          onClick={() => setIsFullScreen(false)}
          className="absolute top-4 right-4 z-50 text-white text-3xl"
        >
          ✕
        </button>
      )}

      <Carousel
        wrapperClassName={
          isFullscreen
            ? "relative w-svw h-svh px-2"
            : "w-full h-[184px] px-2"
        }
        items={galleries.map((item, index) => ({
          key: item.id,
          content: (
            <div
              className={`relative ${
                isFullscreen
                  ? "h-svh py-10 px-5 w-svw"
                  : "w-full h-[184px] px-2"
              }`}
            >
              <ProductGalleryItem
                item={item}
                playersRef={playersRef}
                isActive={index === currentSlide}
                onClick={() => {
                  if (index === currentSlide) {
                    setIsFullScreen((p) => !p);
                  }
                }}
                isFullscreen={isFullscreen}
              />
            </div>
          ),
        }))}
        showDots={false}
        infinite
        onSlideChange={(i) => setCurrentSlide(i)}
        emblaApiRef={emblaRef}
        peek={15}
      />
    </div>
  );
}

export default ProductGalleryCarouselCopy;