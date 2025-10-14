"use client";

import { useRef, useEffect, useState } from "react";
import SlickSlider from "react-slick";
import type { ProductGalleryItem as ProductGalleryItemType } from "@/types/commerce";
import ProductGalleryItem from "./ProductGalleryItem";

interface Props {
  galleries?: ProductGalleryItemType[];
}

const DEFAULT_IMAGE_DURATION = 2000;

const ProductGalleryCarousel: React.FC<Props> = ({ galleries = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const playersRef = useRef<Map<string, HTMLVideoElement>>(new Map());
  const dotsRef = useRef<HTMLUListElement | null>(null);
  const sliderRef = useRef<SlickSlider | null>(null);

  useEffect(() => {
    const dotsContainer = dotsRef.current;
    if (!dotsContainer) return;

    const dots = dotsContainer.querySelectorAll<HTMLLIElement>("li");
    const firstDot = dots[0];
    if (firstDot) {
      firstDot.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, []);

  useEffect(() => {
    if (sliderRef.current && galleries.length > 0) {
      sliderRef.current.slickGoTo(0, true);
    }
  }, [galleries]);

  useEffect(() => {
    if (galleries.length === 0) return;

    const currentItem = galleries[currentSlide];
    if (!currentItem) return;

    let duration = DEFAULT_IMAGE_DURATION;

    if (currentItem.mediaType === "Video") {
      const video = playersRef.current.get(String(currentItem.id));
      if (video) {
        if (isNaN(video.duration) || video.duration === 0) {
          const handleLoaded = () => {
            const dur = video.duration * 1000;
            setTimeout(() => sliderRef.current?.slickNext(), dur);
            video.removeEventListener("loadedmetadata", handleLoaded);
          };
          video.addEventListener("loadedmetadata", handleLoaded);
          return;
        } else {
          duration = video.duration * 1000;
        }
      }
    }

    const timeoutId = setTimeout(() => {
      sliderRef.current?.slickNext();
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [currentSlide, galleries]);

  useEffect(() => {
    const playerMap = playersRef.current;
    if (!playerMap || playerMap.size === 0) return;

    const handleEnded = () => {
      sliderRef.current?.slickNext();
    };

    playerMap.forEach((video) => {
      if (video) video.addEventListener("ended", handleEnded);
    });

    return () => {
      playerMap.forEach((video) => {
        if (video) video.removeEventListener("ended", handleEnded);
      });
    };
  }, [galleries, currentSlide]);

  if (galleries.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center text-gray-500 py-8">
        داده‌ای برای نمایش وجود ندارد
      </div>
    );
  }

  return (
    <div className="w-full mx-auto rounded-xl">
      <SlickSlider
        ref={sliderRef}
        arrows={false}
        infinite
        slidesToShow={1}
        initialSlide={0}
        draggable
        rtl
        afterChange={(current) => setCurrentSlide(current)}
        centerMode
      >
        {galleries.map((item, index) => (
          <div key={item.id} className="relative h-64 px-2">
            <ProductGalleryItem
              item={item}
              playersRef={playersRef}
              isActive={index === currentSlide}
            />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
};

export default ProductGalleryCarousel;
