"use client";

import { useRef, useState, useMemo } from "react";
import SlickSlider, { Settings as SlickSettings } from "react-slick";
import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import ProductGalleryItem from "./ProductGalleryItem";
import type { Player } from "video.js";

// --- Video.js Player type extension ---
declare module "video.js" {
  interface Player {
    hlsQualitySelector?: (options?: {
      displayCurrentQuality?: boolean;
    }) => void;
  }
}

interface Props {
  galleries?: ProductGalleryItemType[];
}

const ProductGalleryCarousel: React.FC<Props> = ({ galleries = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // keep refs of all players (map: galleryId -> player)
  const playersRef = useRef<Map<string, Player>>(new Map());

  // slick settings (memoized)
  const sliderSettings: SlickSettings = useMemo(
    () => ({
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: false,
      afterChange: (current: number) => {
        // pause all videos except current
        playersRef.current.forEach((player, id) => {
          if (id !== String(galleries[current]?.id)) {
            player.pause();
          }
        });
        setCurrentSlide(current);
      },
    }),
    [galleries],
  );

  if (galleries.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center text-gray-500 py-8">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <SlickSlider {...sliderSettings}>
        {galleries.map((item) => {
          const isActive = galleries[currentSlide]?.id === item.id;
          return (
            <div key={item.id} className="relative h-64">
              <ProductGalleryItem
                item={item}
                playersRef={playersRef}
                isActive={isActive}
              />
            </div>
          );
        })}
      </SlickSlider>
    </div>
  );
};

export default ProductGalleryCarousel;
