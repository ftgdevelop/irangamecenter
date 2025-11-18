import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useRef, useState } from "react";
import ProductGalleryItem from "./ProductGalleryItem";
import dynamic from "next/dynamic";

const Carousel = dynamic(() => import("../shared/Carousel"), {
  ssr: false,
});

interface Props {
  galleries?: ProductGalleryItemType[];
}

function ProductGalleryCarousel({ galleries = [] }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullScreen] = useState(false);

  const playersRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const emblaRef = useRef<EmblaCarouselType | null>(null);

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
          type="button"
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
            : "w-full h-auto pr-2"
        }
        items={galleries.map((item, index) => ({
          key: item.id,
          content: (
            <div
              className={`relative ${
                isFullscreen
                  ? "h-svh py-10 px-5 w-svw"
                  : "w-full h-auto px-2"
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
        peek={isFullscreen ? 0 : 15}
      />
    </div>
  );
}

export default ProductGalleryCarousel;